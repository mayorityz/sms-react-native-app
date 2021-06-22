const express = require("express");
const Router = express.Router();

const Controller = require("./../Controllers/Users.Controller");

Router.post("/newuser", Controller.newUser);
Router.post("/login", Controller.login);

module.exports = Router;
