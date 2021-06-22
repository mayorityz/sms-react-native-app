// const DB = require("mongoose");
import { mongoose as DB } from "mongoose";

const userSchema = new DB.Schema({
  firstname: String,
  phonenumber: {
    defaultValue: String,
    unique: true,
  },
  email: String,
  password: String,
  friends: Array,
});

const Users = DB.model("users", userSchema);

module.exports = Users;
