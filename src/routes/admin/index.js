var express = require("express");
var routes = express.Router();

const DashboardController = require("../../http/controllers/admin/DashboardController");
const ProfileController = require("../../http/controllers/admin/ProfileController");

routes.get("/", DashboardController.index);
routes.get("/profile", ProfileController.profile);
routes.get("/changePassword", ProfileController.changePassword);
routes.post("/changePassword", ProfileController.handleChangePassword);

module.exports = routes;
