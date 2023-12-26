var express = require("express");
var router = express.Router();

const DashboardController = require("../../http/controllers/admin/DashboardController");
const ProfileController = require("../../http/controllers/admin/ProfileController");

const userRouter = require("./user");
const profileRouter = require("./profile");
const courseRouter = require("./course");

router.get("/", DashboardController.index);
router.get("/changePassword", ProfileController.changePassword);
router.post("/changePassword", ProfileController.handleChangePassword);

router.use("/profile", profileRouter);
router.use("/users", userRouter);
router.use("/courses", courseRouter);

module.exports = router;
