import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import { storVendorResponse } from "./storeVendorResponse.js";

export const extractRfpId = (text = "") => {
  const match = text.match(/RFP ID:\s*([a-f0-9]{24})/i);
  return match ? match[1] : null;
};
const extractLatestText = (text = "") => {
  if (!text) return "";

  const splitPatterns = [
    /\n\s*On .* wrote:/i, // Gmail / Outlook
    /\n\s*>+/g, // Quoted lines
    /\n\s*From:/i, // Some clients
  ];

  let cleanText = text;

  for (const pattern of splitPatterns) {
    cleanText = cleanText.split(pattern)[0];
  }

  return cleanText.trim();
};

const extractEmails = (text = "") => {
  const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
  return matches ? [...new Set(matches)] : [];
};
const getSenderFromBody = (text, ownEmails = []) => {
  const emails = extractEmails(text);

  return (
    emails.find(
      (email) =>
        !ownEmails.some((own) => email.toLowerCase() === own.toLowerCase()),
    ) || null
  );
};

const imapConfig = {
  imap: {
    user: "sanskar.wrk",
    password: process.env.GMAIL_APP_PASSWORD,
    host: "imap.gmail.com",
    port: 993,
    tls: true,

    connTimeout: 30000, // ⬅ increase
    authTimeout: 30000, // ⬅ increase
    tlsOptions: {
      rejectUnauthorized: false,
    },
  },
};

/**
 * Check unread replies
 */
export const checkEmails = async () => {
  try {
    const connection = await imaps.connect(imapConfig);
    console.log("IMAP connected");

    await connection.openBox("INBOX");

    const fetchOptions = {
      bodies: ["HEADER", "TEXT"],

      markSeen: true,
    };

    const searchCriteria = ["UNSEEN"];
    const messages = await connection.search(searchCriteria, fetchOptions);

    const OWN_EMAILS = ["sanskar.wrk@gmail.com"];

    for (const item of messages) {
      // ---- Safely get raw body ----
      const textPart =
        item.parts.find((p) => p.which === "TEXT") ||
        item.parts.find((p) => p.which === "HTML");

      const rawBody = textPart?.body || "";
      const parsed = await simpleParser(rawBody);

      // ---- Resolve sender email (ALL possible ways) ----
      const senderEmail = (() => {
        // 1️⃣ IMAP envelope (most reliable)
        const envFrom = item.attributes?.envelope?.from?.[0];
        if (envFrom?.mailbox && envFrom?.host) {
          return `${envFrom.mailbox}@${envFrom.host}`;
        }

        // 2️⃣ Parsed FROM
        if (parsed.from?.value?.[0]?.address) {
          return parsed.from.value[0].address;
        }

        // 3️⃣ Reply-To
        if (parsed.replyTo?.value?.[0]?.address) {
          return parsed.replyTo.value[0].address;
        }

        // 4️⃣ Extract from body
        const bodyText = parsed.text || parsed.html || "";
        const emails =
          bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) ||
          [];

        const senderFromBody = emails.find(
          (e) => !OWN_EMAILS.includes(e.toLowerCase()),
        );

        return (
          senderFromBody ||
          `unknown_${item.attributes?.uid || Date.now()}@unknown.com`
        );
      })();

      console.log("📩 Sender:", senderEmail);

      // ---- Existing logic (UNCHANGED) ----
      const subject = parsed.subject || "";
      const rfpId = extractRfpId(subject) || extractRfpId(parsed.text);

      if (!rfpId) {
        console.log("⚠️ Not an RFP reply, skipping");
        continue;
      }

      const reply = extractLatestText(parsed.text || "");
      await storVendorResponse(reply, senderEmail, rfpId);
    }

    await connection.end();
  } catch (err) {
    console.error("IMAP check failed:", err.message);
  }
};
