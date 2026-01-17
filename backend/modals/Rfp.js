import mongoose from "mongoose";

const ItemSpecSchema = new mongoose.Schema(
  {
    itemName: { type: String },
    quantity: { type: Number },
    specifications: { type: Object }, // flexible (RAM, size, etc.)
  },
  { _id: false }
);

// ---------- TYPE-SPECIFIC SCHEMAS ----------
const GoodsDetailsSchema = new mongoose.Schema(
  {
    items: [ItemSpecSchema],
    deliveryLocation: { type: String },
  },
  { _id: false }
);

const ServicesDetailsSchema = new mongoose.Schema(
  {
    scopeOfWork: [String],
    durationMonths: Number,
    pricingModel: { type: String, enum: ["fixed", "hourly"] },
    estimatedEffortHours: Number,
    requiredSkills: [String],
    sla: {
      uptime: String,
      supportHours: String,
    },
  },
  { _id: false }
);

const SoftwareDetailsSchema = new mongoose.Schema(
  {
    functionalRequirements: [String],
    nonFunctionalRequirements: {
      uptime: String,
      security: [String],
      dataResidency: String,
    },
    licensing: {
      model: String,
      expectedUsers: Number,
    },
    integrationRequirements: [String],
    supportLevel: String,
  },
  { _id: false }
);

// ---------- MAIN RFP SCHEMA ----------
const RfpSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    rfpType: {
      type: String,
      enum: ["goods", "services", "software"],
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "sent", "responses_received", "awarded"],
      default: "draft",
    },

    summary: String,

    budget: {
      currency: { type: String, default: "USD" },
      maxAmount: Number,
    },

    timeline: {
      proposalDueDate: Date,
      deliveryDays: Number,
    },

    paymentTerms: String,
    warrantyRequired: String,

    evaluationCriteria: {
      priceWeight: Number,
      deliveryWeight: Number,
      qualityWeight: Number,
      complianceWeight: Number,
    },

    selectedVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],

    // 🔗 GENERAL + TYPE-SPECIFIC LINK
    details: {
      goods: { type: GoodsDetailsSchema, default: null },
      services: { type: ServicesDetailsSchema, default: null },
      software: { type: SoftwareDetailsSchema, default: null },
    },

    createdBy: String,
  },
  { timestamps: true }
);

export default mongoose.model("Rfp", RfpSchema);
