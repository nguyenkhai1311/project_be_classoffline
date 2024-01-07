var express = require("express");
var routes = express.Router();

const HomeController = require("../../http/controllers/students/HomeController");

routes.get("/", HomeController.index);

module.exports = routes;
