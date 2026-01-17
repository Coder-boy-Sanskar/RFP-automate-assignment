import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },

    categories: {
      type: [String],
      enum: ["goods", "services", "software"],
    },

    contactPerson: String,
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", VendorSchema);
