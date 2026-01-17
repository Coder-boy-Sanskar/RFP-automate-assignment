import { groq } from "../lib/groq.js";
import { generateRfpEmail } from "./rfpEmailGenerator.js";

// 🔒 Utility to safely extract JSON from LLM output
function sanitizeJson(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

export async function extractRfpFromText(userInput) {
  const prompt = `
You are an AI assistant that extracts structured procurement data.

Rules:
- Identify rfpType: goods | services | software
- Follow the MongoDB RFP schema exactly
- If a field is missing, set it to null
- Do NOT invent data
- Output ONLY valid JSON (no markdown, no explanation )
- only json response i want , start with curly bracket and close with closed bracket

MongoDB RFP schema:
{
  title,
  rfpType,
  summary,
  budget: { currency, maxAmount },
  timeline: { proposalDueDate, deliveryDays },
  paymentTerms,
  warrantyRequired,
  details: {
    goods: {
      items: [{ itemName, quantity, specifications }],
      deliveryLocation
    },
    services: null,
    software: null
  }
}

RFP description:
"""
${userInput}
"""
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const rawText = completion.choices[0].message.content;
  console.log("Groq raw output:\n", rawText);

  const cleanText = sanitizeJson(rawText);

  try {
    return JSON.parse(cleanText);
  } catch (err) {
    console.error("Sanitized text:\n", cleanText);
    throw new Error("Invalid JSON returned by Groq");
  }
}

// 🧪 Local test
const input = `I need to procure laptops and monitors for our new Bangalore office.
Budget is $50,000 total.
We need 20 laptops with 16GB RAM and 15 monitors of 27-inch.
Delivery required within 30 days.
Payment terms should be Net 30 and minimum 1 year warranty.`;

// extractRfpFromText(input).then(console.log).catch(console.error);
