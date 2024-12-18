const validateInputs = (req, res, next) => {
  const { dob, premiumFrequency, sumAssured, modalPremium, pt, ppt } = req.body;

  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  if (age < 23 || age > 56)
    return res.status(400).json({ error: "Invalid Age" });

  if (pt <= ppt)
    return res.status(400).json({ error: "PT should be greater than PPT" });

  if (modalPremium < 10000 || modalPremium > 500000) {
    return res.status(400).json({ error: "Premium out of range" });
  }

  const minimumSumAssured = Math.min(modalPremium * 10, 5000000);

  if (sumAssured < minimumSumAssured) {
    return res.status(400).json({
      error: `Sum Assured must be at least ${minimumSumAssured}`,
    });
  }

  const allowedFrequencies = ["Yearly", "Half-Yearly", "Monthly"];
  if (!allowedFrequencies.includes(premiumFrequency)) {
    return res.status(400).json({ error: "Invalid Premium Frequency" });
  }

  if (sumAssured < 10 * modalPremium || sumAssured > 5000000) {
    return res.status(400).json({ error: "Invalid Sum Assured" });
  }

  req.body.age = age;
  next();
};

export default validateInputs;
