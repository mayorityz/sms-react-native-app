const PaymentModel = require("./../Models/Payment.Model");

exports.logPayment = (req, res) => {
  const { username, email, amountPaid, userid } = req.body;
  console.log(req.body);
  try {
    const save = new PaymentModel({ username, email, amountPaid, userid });
    save.save((error, response) => {
      if (error) {
        res.status(201).json({
          status: false,
          message: error.message,
        });
      } else {
        res.status(201).json({
          status: true,
          message: "successful",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
