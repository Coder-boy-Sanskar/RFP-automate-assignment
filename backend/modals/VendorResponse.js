import mongoose from "mongoose";

const VendorResponseSchema = new mongoose.Schema(
  {
    rfpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rfp",
      required: true,
      index: true,
    },

    vendorEmail: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    aiSummary: {
      type: String,
      required: true,
    },

    aiScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    extractedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Prevent duplicate scoring of same vendor for same RFP
VendorResponseSchema.index({ rfpId: 1, vendorEmail: 1 }, { unique: true });

export default mongoose.model("VendorResponse", VendorResponseSchema);
