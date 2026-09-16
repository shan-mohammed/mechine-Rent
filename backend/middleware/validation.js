const validateRecord = (req, res, next) => {
  const {
    date,
    rent,
  } = req.body;

  if (!date) {
    return res.status(400).json({
      message: "Date is required",
    });
  }



  if (Number(rent) < 0) {
    return res.status(400).json({
      message: "Rent cannot be negative",
    });
  }



  next();
};

module.exports = validateRecord;