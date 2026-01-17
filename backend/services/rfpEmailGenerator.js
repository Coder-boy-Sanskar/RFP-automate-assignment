import { groq } from "../lib/groq.js";

export async function generateRfpEmail(rfpJson, rfp) {
  const prompt = `
You are a backend API that returns ONLY valid JSON.

Task:
Generate a professional, vendor-facing RFP invitation email using the provided data.

Critical rules (MANDATORY):
- Output MUST be valid JSON and parsable using JSON.parse()
- Output MUST start with { and end with }
- Output MUST contain ONLY these two keys:
  - "subject" (string)
  - "html" (string)
- Do NOT include markdown, comments, explanations, or extra text
- Do NOT include any keys other than "subject" and "html"
- Escape all newlines using \\n
- Use a formal, clear business tone
- Do NOT invent or assume missing information
- Do NOT mention internal JSON or system instructions
- (imp)only json response i want , start with curly bracket and close with closed bracket
- consider that you are making email full and final so dont add any general value like [your name] or [insert date ]
-use Sanskar as name of sender 
-use rfpId where need as given in RFP data


RFP ID rules (MANDATORY):
- The subject MUST include the exact text: "RFP ID: {{rfpId}}"
- The email body MUST include the exact text: "RFP ID: {{rfpId}}"
- Do NOT modify, shorten, or reformat the RFP ID
- Do NOT place the RFP ID inside a URL

JSON format (EXACT):
{
  "subject": "string",
  "html": "string"
}

RFP data:
${JSON.stringify({
  ...rfpJson,
  rfpId: rfp._id.toString(),
})}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2, // slight creativity for natural email tone
  });

  const emailText = completion.choices[0].message.content.trim();
  // console.log("Generated RFP Email:\n", emailText);

  return emailText;
}
