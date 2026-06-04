import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { getSystemPrompt, getPostCapturePrompt } from '../../src/clientConfig';

const captureLeadDeclaration: FunctionDeclaration = {
  name: "capture_lead",
  description: "Call this tool once the user has provided their name and AT LEAST ONE contact method (phone or email).",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The full name of the lead" },
      phone: { type: Type.STRING, description: "The phone number of the lead" },
      email: { type: Type.STRING, description: "The email address of the lead" },
      treatmentInterest: { type: Type.STRING, description: "High-value treatments mentioned (e.g., 'Implants', 'Veneers', 'Invisalign'), emergency context, or just 'General'" }
    },
    required: ["name"]
  }
};

const updateLeadDeclaration: FunctionDeclaration = {
  name: "update_lead",
  description: "Call this tool to update the lead with new info if the user provides additional contact details (like an email or phone) or additional treatment context after the initial capture.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The exact same full name of the lead requested previously" },
      phone: { type: Type.STRING, description: "The phone number of the lead, if provided" },
      email: { type: Type.STRING, description: "The email address of the lead, if provided" },
      treatmentInterest: { type: Type.STRING, description: "The new or updated treatment interest or context" }
    },
    required: ["name"]
  }
};

export const onRequestPost = async (context: any) => {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { messages, leadCaptured } = body as {
      messages: { role: "user" | "model", content: string }[],
      leadCaptured: boolean
    };

    if (!env.GEMINI_API_KEY) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const aiClient = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    const contents = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await aiClient.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: leadCaptured ? getPostCapturePrompt() : getSystemPrompt(),
        tools: [{ functionDeclarations: leadCaptured ? [updateLeadDeclaration] : [captureLeadDeclaration] }],
        toolConfig: { includeServerSideToolInvocations: true }
      }
    });

    let replyText = response.text || "";
    let functionCall = null;

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls.find(fc => fc.name === "capture_lead" || fc.name === "update_lead");
      if (call) {
        functionCall = {
          name: call.name,
          args: call.args
        };
      }
      if (!replyText) {
        replyText = call?.name === "capture_lead" 
          ? "Thank you so much! Our team has received your details and will be in touch with you shortly. Is there anything else I can help you with today?"
          : "Got it! I've updated your clinic file with this new information. Anything else you need attached to your details?";
      }
    } else if (!replyText) {
      replyText = "I'm sorry, I couldn't process that.";
    }

    return Response.json({ text: replyText, functionCall });

  } catch (error: any) {
    console.error("AI Error:", error);
    return Response.json(
      { error: typeof error?.message === 'string' ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
