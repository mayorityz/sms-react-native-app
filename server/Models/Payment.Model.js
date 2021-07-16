const DB = require("mongoose");

const paymentSchema = new DB.Schema({
  username: String,
  email: String,
  amountPaid: Number,
  datePaid: {
    type: Date,
    default: Date.now(),
  },
  userid: String,
});

const Payments = DB.model("payment", paymentSchema);

module.exports = Payments;
