import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { getSystemPrompt, getPostCapturePrompt } from '../../src/clientConfig';

const captureLeadDeclaration: FunctionDeclaration = {
  name: "capture_lead",
  description: "Call this tool once the user has provided their name and phone number.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The full name of the lead" },
      phone: { type: Type.STRING, description: "The phone number of the lead" }
    },
    required: ["name", "phone"]
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
        ...( !leadCaptured ? { tools: [{ functionDeclarations: [captureLeadDeclaration] }] } : {} ),
        toolConfig: { includeServerSideToolInvocations: true }
      }
    });

    let replyText = response.text || "";
    let functionCall = null;

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls.find(fc => fc.name === "capture_lead");
      if (call) {
        functionCall = {
          name: call.name,
          args: call.args
        };
      }
      if (!replyText) {
        replyText = "Thank you so much! Our team has received your details and will be in touch with you shortly. Is there anything else I can help you with today?";
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
