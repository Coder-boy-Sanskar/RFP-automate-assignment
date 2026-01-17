import nodemailer from "nodemailer";
import Email from "../modals/Email.js";
/**
 * Create reusable transporter
 */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanskar.wrk@gmail.com",
    pass: "pppf poyd cmxx kgzi",
  },
});
console.log(process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD);

/**
 * Send email to multiple users
 * @param {Array<{id: string, email: string}>} recipients
 */
export const sendEmails = async (recipients, subject, htmlContent, rfid) => {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    throw new Error("Recipients must be a non-empty array");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  for (const user of recipients) {
    const { id, email } = user;

    if (!id || !email || !emailRegex.test(email)) {
      console.warn(`Skipping invalid email: ${email}`);
      continue;
    }

    const emailstored = new Email({ rfpId: rfid, email });
    await emailstored.save();

    const mailOptions = {
      from: `"RFP Demo" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `${subject}`,
      html: htmlContent,
    };
    console.log(mailOptions);

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`, info.messageId);
    } catch (err) {
      console.error(`Failed to send email to ${email}`, err.message);
    }
  }
};
