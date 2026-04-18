import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

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
