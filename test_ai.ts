import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: 'hi' }] }]
    });
    console.log(res.text);
  } catch (e) {
    console.error("AI Error:", e);
  }
}
test();
