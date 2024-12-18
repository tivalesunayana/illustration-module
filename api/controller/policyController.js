import Policy from "../model/Policy.js";

export const createPolicy = async (req, res) => {
  const {
    dob,
    gender,
    sumAssured,
    modalPremium,
    premiumFrequency,
    pt,
    ppt,
    age,
  } = req.body;

  const illustrationData = [];
  let totalPremiumPaid = 0;
  let bonusRate = 2.5;
  const netCashFlows = [];

  try {
    for (let i = 1; i <= pt; i++) {
      let premiumPaid = 0;
      let bonusAmount = 0;
      let totalBenefit = 0;
      let netCashFlow = 0;

      if (i <= ppt) {
        premiumPaid = modalPremium;
        totalPremiumPaid += premiumPaid;
      }

      if (i === 1) {
        bonusRate = 2.5;
      } else if (i <= 7) {
        bonusRate = 3;
      } else if (i <= 16) {
        bonusRate = 3.5;
      } else if (i === 17) {
        bonusRate = 4;
      } else if (i === 18) {
        bonusRate = 4.5;
      } else {
        bonusRate = 25;
      }

      bonusAmount = (sumAssured * bonusRate) / 100;
      totalBenefit = i === pt ? sumAssured + bonusAmount : 0;

      if (i <= ppt) {
        netCashFlow = -premiumPaid;
      } else if (i === pt) {
        netCashFlow = totalBenefit - totalPremiumPaid;
      } else {
        netCashFlow = 0;
      }

      illustrationData.push({
        year: i,
        premiumPaid: i <= ppt ? premiumPaid : 0,
        sumAssured: i === pt ? sumAssured : 0,
        bonusRate: `${bonusRate}%`,
        bonusAmount,
        totalBenefit,
        netCashFlows: netCashFlow,
      });
    }

    const policy = new Policy({
      dob,
      gender,
      sumAssured,
      modalPremium,
      premiumFrequency,
      pt,
      ppt,
      age,
    });

    await policy.save();

    res
      .status(200)
      .json({ message: "Policy Created", illustration: illustrationData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating policy", error });
  }
};
