import { groq } from "../lib/groq.js";
import { generateRfpEmail } from "./rfpEmailGenerator.js";

// 🔒 Utility to safely extract JSON from LLM output
function sanitizeJson(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

export async function scoreGenerator(rfp, vendorReply) {
  const prompt = buildVendorEvaluationPrompt(rfp, vendorReply);

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const rawText = completion.choices[0].message.content;
  // console.log("Groq raw output:\n", rawText);

  try {
    return rawText;
  } catch (err) {
    console.error("Sanitized text:\n", cleanText);
    throw new Error("Invalid JSON returned by Groq");
  }
}
export const buildVendorEvaluationPrompt = (rfp, vendorReply) => `
You are a procurement evaluation system.

Evaluate the vendor reply against the RFP.

Rules:
- Be objective and concise
- Score from 0 to 100
- Do NOT invent information
- Base evaluation ONLY on provided data
- Output ONLY valid JSON
- No markdown, no explanations
- (imp)only json response i want , start with curly bracket and close with closed bracket
- ur response will direct pass to Json.Parse() func if u response contain anything other than json than we got error so please start your response  with curly bracket and close with closed bracket


JSON FORMAT (EXACT):
{
  "score": string,
  "summary": "string"
}

RFP:
${JSON.stringify(rfp)}

Vendor Reply:
${vendorReply}
`;
