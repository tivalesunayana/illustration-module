import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    sumAssured: { type: Number, required: true },
    modalPremium: { type: Number, required: true },
    bonusRate: { type: Number },
    bonusAmount: { type: Number },
    totalBenefit: { type: Number },
    netCashFlows: { type: Number },

    premiumFrequency: { type: String, required: true },
    pt: { type: Number, required: true },
    ppt: { type: Number, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
