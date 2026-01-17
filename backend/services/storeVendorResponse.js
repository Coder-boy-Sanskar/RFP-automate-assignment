import Rfp from "../modals/Rfp.js";
import VendorResponse from "../modals/VendorResponse.js";
import mongoose from "mongoose";
import { scoreGenerator } from "./Scoregenerator.js";

export const storVendorResponse = async (reply, email, rfpId) => {
  // ---- Validation ----
  if (!reply || !email || !rfpId) {
    throw new Error("Missing required parameters");
  }

  if (!mongoose.Types.ObjectId.isValid(rfpId)) {
    throw new Error("Invalid RFP ID");
  }

  // ---- Fetch RFP ----
  const rfp = await Rfp.findById(rfpId).lean();
  if (!rfp) {
    throw new Error("RFP not found");
  }

  // ---- Prevent duplicate evaluation ----
  const existing = await VendorResponse.findOne({
    rfpId,
    vendorEmail: email,
  });

  if (existing) {
    return existing; // idempotent behavior
  }

  // ---- AI Evaluation ----
  const aiRaw = await scoreGenerator(rfp, reply);

  let aiResult;
  try {
    console.log(aiRaw);
    aiResult = JSON.parse(aiRaw);
  } catch {
    throw new Error("Invalid AI response");
  }

  const { score, summary } = aiResult;

  if (typeof score !== "number" || score < 0 || score > 100 || !summary) {
    throw new Error("AI returned invalid evaluation");
  }

  // ---- Store Response ----
  const vendorResponse = await VendorResponse.create({
    rfpId,
    vendorEmail: email,

    aiScore: score,
    aiSummary: summary,
  });
  console.log(vendorResponse);

  return vendorResponse;
};
