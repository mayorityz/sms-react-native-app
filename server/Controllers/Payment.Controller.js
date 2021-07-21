const PaymentModel = require("./../Models/Payment.Model");
const UserModel = require("./../Models/User.Model");

exports.logPayment = (req, res) => {
  const { username, email, amountPaid, userid } = req.body;
  try {
    const save = new PaymentModel({ username, email, amountPaid, userid });
    save.save((error, response) => {
      if (error) {
        res.status(201).json({
          status: false,
          message: error.message,
        });
      } else {
        UserModel.updateOne(
          { _id: userid },
          { $inc: { wallet: parseInt(amountPaid) } },
          (err, state) => {
            if (err) {
              res.status(400).json({
                status: false,
                message: "Error Occured",
              });
            } else {
              res.status(201).json({
                status: true,
                message: "successful",
              });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};
