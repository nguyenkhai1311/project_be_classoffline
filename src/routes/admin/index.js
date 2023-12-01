var express = require("express");
var routes = express.Router();

const DashboardController = require("../../http/controllers/admin/DashboardController");
const ProfileController = require("../../http/controllers/admin/ProfileController");

routes.get("/", DashboardController.index);
routes.get("/profile", ProfileController.profile);

module.exports = routes;
