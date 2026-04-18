import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const SYSTEM_PROMPT = `You are a warm, highly professional, and human-like receptionist for the VerveDentist clinic. 
Your goal is to answer initial questions, build trust, and ultimately capture the lead by getting their name and phone number so the clinic can follow up with them.

Here is all the information about VerveDentist:
- Email: madudimcjx@gmail.com
- Phone / WhatsApp: +229 01 92 20 66 12
- Address: 123 Medical Plaza, Suite 400, New York, NY 10001
- Working Hours: Monday - Sunday (5am - 6pm)
- Services: General Checkups & Cleaning, Teeth Whitening, Dental Implants, Braces & Orthodontics, Cosmetic Dentistry, Emergency Dental Care.
- Benefits: Expert Team, Painless Care, Affordable payment plans, Flexible (evening and weekend slots).
- How it works: 1. Book appointment 2. Consultation 3. Personalized Treatment 4. Enjoy confident smile.

FAQs:
- Hurt? We prioritize comfort with modern techniques and anesthetics. Most treatments are pain-free.
- How to know which treatment? During initial consultation, experts evaluate oral health and discuss goals.
- Cosmetic safe? Yes, performed by certified professionals.
- Insurance/Payment? We accept most major dental insurances and offer flexible payment plans.

Rules:
1. Be very friendly and sound like a real human receptionist. Use conversational phrases. NEVER mention that you are an AI or bot.
2. KEEP YOUR ANSWERS SHORT AND CONCISE. Aim for 1 to 2 short sentences per reply, but use more ONLY if the specific answer requires detailed information. Do not write long paragraphs so it doesn't stress the user.
3. Answer their questions clearly using the provided info.
4. Don't let the lead go! After answering their initial query, naturally ask for their name and phone number so a dental specialist can reach out to them directly.
5. ONCE THEY PROVIDE THEIR NAME AND PHONE NUMBER, you MUST call the "capture_lead" tool immediately. 
6. After calling the tool, thank them warmly, tell them our team will be in touch shortly, and ASK: "Is there anything else I can help you with today?".
7. If they reply that they don't need help with anything else (e.g., "no", "thank you", "that's all"), wish them a great day and conclude the conversation gracefully.
8. Only call the "capture_lead" tool ONCE per conversation.`;

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

  app.post("/api/chat", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: "AI not configured" });
      }
      
      const { messages } = req.body;
      const contents = messages.map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: [{ functionDeclarations: [captureLeadDeclaration] }],
          toolConfig: { includeServerSideToolInvocations: true }
        }
      });

      let replyText = response.text || "";
      let capturedLead = null;

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls.find((fc: any) => fc.name === "capture_lead");
        
        if (call && call.args) {
          capturedLead = call.args;
        }

        if (!replyText) {
          replyText = "Thank you so much! Our team has received your details and will be in touch with you shortly. Is there anything else I can help you with today?";
        }
      } else if (!replyText) {
        replyText = "I'm sorry, I couldn't process that.";
      }

      res.json({ replyText, capturedLead });
    } catch (error) {
      console.error("Error in AI chat:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // API Route to forward lead emails
  app.post("/api/send-lead", async (req, res) => {
    try {
      const { name, phone, transcript } = req.body;
      
      const emailContent = `
NEW LEAD CAPTURED FROM VERVEDENTIST AI ASSISTANT

Lead Name: ${name}
Lead Phone: ${phone}

--- CHAT TRANSCRIPT ---
${transcript}
      `.trim();

      // We use formsubmit.co's free API to route the email silently. 
      // This sends a real email to madudimcjx@gmail.com without needing an SMTP configuration.
      const response = await fetch("https://formsubmit.co/ajax/madudimcjx@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://vervedentist-ai.com',
          'Referer': 'https://vervedentist-ai.com/'
        },
        body: JSON.stringify({
          _subject: `Urgent: Dental Lead - ${name}`,
          "Lead Name": name,
          "Phone Number": phone,
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
