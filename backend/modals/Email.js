import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema(
  {
    rfpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rfp",
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // adds createdAt & updatedAt automatically
);

export default mongoose.model("Email", EmailSchema);
