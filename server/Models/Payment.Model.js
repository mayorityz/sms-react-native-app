import { mongoose as DB } from "mongoose";

const paymentSchema = new DB.Schema({
  firstname: String,
  phonenumber: {
    defaultValue: String,
    unique: true,
  },
  email: String,
  password: String,
  friends: Array,
});

const Payments = DB.model("payment", paymentSchema);

module.exports = Payments;
