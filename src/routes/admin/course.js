var express = require("express");
var router = express.Router();

const CourseController = require("../../http/controllers/admin/CourseController");

router.get("/", CourseController.index);
router.get("/add", CourseController.add);

module.exports = router;
