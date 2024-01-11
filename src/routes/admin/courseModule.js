var express = require("express");
var router = express.Router();

const CourseModuleController = require("../../http/controllers/admin/CourseModuleController");

router.get("/", CourseModuleController.index);

module.exports = router;
