var express = require("express");
var router = express.Router();

const DashboardController = require("../../http/controllers/admin/DashboardController");
const ProfileController = require("../../http/controllers/admin/ProfileController");

const userRouter = require("./user");

router.get("/", DashboardController.index);
router.get("/profile", ProfileController.profile);
router.get("/changePassword", ProfileController.changePassword);
router.post("/changePassword", ProfileController.handleChangePassword);

router.use("/user", userRouter);

module.exports = router;
