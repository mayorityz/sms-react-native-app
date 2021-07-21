const express = require("express");
const Router = express.Router();

const Controller = require("./../Controllers/Users.Controller");

Router.post("/newuser", Controller.newUser);
Router.post("/login", Controller.login);
Router.post("/addme", Controller.addFriends);

module.exports = Router;
