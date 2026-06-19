import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { getSystemPrompt, getPostCapturePrompt } from './src/clientConfig';

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Local endpoint mapping for cloudflare Pages functions/api/chat.ts
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, leadCaptured } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const contents = messages.map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: leadCaptured ? getPostCapturePrompt() : getSystemPrompt(),
          tools: [{ functionDeclarations: leadCaptured ? [updateLeadDeclaration] : [captureLeadDeclaration] }],
          toolConfig: { includeServerSideToolInvocations: true },
          maxOutputTokens: 150,
          temperature: 0.7
        }
      });

      let replyText = response.text || "";
      let functionCall = null;

      if (response.functionCalls && response.functionCalls.length > 0) {
        let call = response.functionCalls.find((fc: any) => fc.name === "capture_lead" || fc.name === "update_lead");
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

      return res.json({ text: replyText, functionCall });
    } catch (error: any) {
      console.error("AI Error:", error);
      return res.status(500).json({ 
        error: typeof error?.message === 'string' ? error.message : "Unknown error" 
      });
    }
  });

  // API Route to forward lead emails
  app.post("/api/send-lead", async (req, res) => {
    try {
      const { name, phone, email, treatmentInterest, transcript } = req.body;
      
      const interestTag = treatmentInterest && treatmentInterest.toLowerCase() !== 'general' 
                          ? `[${treatmentInterest.toUpperCase()}]` 
                          : '';
      const subject = `Urgent: Dental Lead ${interestTag} - ${name}`;

      const emailContent = `
NEW LEAD CAPTURED FROM VERVE DENTAL AI RECEPTIONIST

Lead Name: ${name}
Lead Phone: ${phone || 'Not provided'}
Lead Email: ${email || 'Not provided'}
Interest/Context: ${treatmentInterest || 'General'}

--- CHAT TRANSCRIPT ---
${transcript}
      `.trim();

      // We use FormSubmit's free API to route the email.
      // NOTE: madudimcjx@gmail.com MUST click "Activate" in the verification email FormSubmit sends on the first test.
      const response = await fetch("https://formsubmit.co/ajax/madudimcjx@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: subject,
          "Lead Name": name,
          "Phone Number": phone,
          "Email Address": email,
          "Interest": treatmentInterest || "General",
          "Chat Transcript": transcript
        })
      });

      if (!response.ok) {
        throw new Error("Failed to forward lead to email.");
      }

      res.json({ success: true, message: "Lead forwarded successfully." });
    } catch (error) {
      console.error("Error sending lead:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });



  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
