var express = require("express");
var routes = express.Router();

const DashboardController = require("../../http/controllers/admin/DashboardController");

routes.get("/", DashboardController.index);

module.exports = routes;
