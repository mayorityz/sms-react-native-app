const express = require("express");
const Router = express.Router();

const Controller = require("./../Controllers/Payment.Controller");

Router.post("/newpayment", Controller.logPayment);

module.exports = Router;
