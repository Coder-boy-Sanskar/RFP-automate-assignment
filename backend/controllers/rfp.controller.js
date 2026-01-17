import Email from "../modals/Email.js";
import Rfp from "../modals/Rfp.js";
import Vendor from "../modals/Vendor.js";
import VendorResponse from "../modals/VendorResponse.js";
import { generateRfpEmail } from "../services/rfpEmailGenerator.js";
import { extractRfpFromText } from "../services/rfpExtractor.js";
import { extractRfpTypeFromText } from "../services/rfptypeExtract.js";
import { sendEmails } from "../services/sendEmail.js";

export const getVendorDetails = async (req, res) => {
  const { query } = req.body;

  try {
    if (!query || query == "") {
      return res.status(400).json({ message: "please enter valid query" });
    }
    const typeRes = await extractRfpTypeFromText(query);
    console.log(typeRes.rfpType, "type");

    const vendors = await Vendor.find({ categories: typeRes.rfpType });
    console.log(vendors);

    if (!vendors)
      return res
        .status(404)
        .json({ message: "Did not find any vendor for this query" });
    return res
      .status(200)
      .json({ message: "sucessfully sent vendor data", vendors });
  } catch (error) {
    return res.status(500).json({
      error: "there is error in backend",
      message: error.message,
    });
  }
};
export const sendEmailToAll = async (req, res) => {
  try {
    const { query, emails } = req.body;

    // -------------------------
    // Basic validation
    // -------------------------
    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Query is required and must be a non-empty string.",
      });
    }

    if (!Array.isArray(emails) || emails.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Emails must be a non-empty array." });
    }

    // -------------------------
    // Extract RFP object from query text
    // -------------------------
    const rfpObj = await extractRfpFromText(query);

    // Optional: add createdBy if you have auth
    // rfpObj.createdBy = req.user?.id || "system";

    const rfp = new Rfp(rfpObj);
    await rfp.save();

    // -------------------------
    // Generate email template from AI
    // -------------------------
    const emailData = await generateRfpEmail(rfpObj, rfp);

    let emailTemplate;
    try {
      emailTemplate = JSON.parse(emailData);
    } catch (err) {
      console.error("Failed to parse email JSON:", err);
      return res
        .status(500)
        .json({ success: false, message: "Invalid email template generated." });
    }

    // -------------------------
    // Send emails (your existing function)
    // -------------------------
    await sendEmails(
      emails,
      emailTemplate.subject,
      emailTemplate.html,
      rfp._id,
    );

    // -------------------------
    // Success response
    // -------------------------
    return res.status(200).json({
      success: true,
      message: "RFP saved and emails sent successfully.",
      rfpId: rfp._id,
      emailsCount: emails.length,
    });
  } catch (error) {
    console.error("sendEmailToAll error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while sending RFP emails.",
    });
  }
};

export const getRfps = async (req, res) => {
  try {
    const rfps = await Rfp.find({})
      .sort({ createdAt: -1 }) // latest first
      .limit(10);

    return res.status(200).json({ success: true, data: rfps });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getEmailSent = async (req, res) => {
  try {
    const { rfpId } = req.body;

    if (!rfpId) {
      return res
        .status(400)
        .json({ success: false, message: "rfpId is required" });
    }

    const emails = await Email.find({ rfpId });
    const emailsWithVendor = await Promise.all(
      emails.map(async (e) => {
        const vendor = await Vendor.findOne({ email: e.email }).lean();
        return {
          ...e.toObject(),
          vendor: vendor || null, // attach vendor info if exists
        };
      }),
    );

    return res.status(200).json({ success: true, data: emailsWithVendor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getvendorResList = async (req, res) => {
  try {
    const { rfpId } = req.body;

    if (!rfpId) {
      return res
        .status(400)
        .json({ success: false, message: "rfpId is required" });
    }

    const responses = await VendorResponse.find({ rfpId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, data: responses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
