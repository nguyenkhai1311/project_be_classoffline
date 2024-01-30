var express = require("express");
var router = express.Router();

const DashboardController = require("../../http/controllers/admin/DashboardController");
const ProfileController = require("../../http/controllers/admin/ProfileController");
const SettingsController = require("../../http/controllers/admin/SettingsController");
const CalendarController = require("../../http/controllers/admin/CalendarController");

const userRouter = require("./user");
const profileRouter = require("./profile");
const courseRouter = require("./course");
const classRouter = require("./class");
const teacherRouter = require("./teacher");
const studentRouter = require("./student");
const courseModuleRouter = require("./courseModule");
const moduleDocumentRouter = require("./moduleDocument");
const roleRouter = require("./role");

router.get("/", DashboardController.index);
router.get("/changePassword", ProfileController.changePassword);
router.post("/changePassword", ProfileController.handleChangePassword);

router.use("/profile", profileRouter);
router.use("/users", userRouter);
router.use("/courses", courseRouter);
router.use("/classes", classRouter);
router.use("/teachers", teacherRouter);
router.use("/students", studentRouter);
router.use("/course-modules", courseModuleRouter);
router.use("/module-documents", moduleDocumentRouter);
router.use("/roles", roleRouter);

router.get("/settings", SettingsController.index);
router.get("/calendar", CalendarController.index);

module.exports = router;
