var express = require("express");
var router = express.Router();

const TeacherController = require("../../http/controllers/admin/TeacherController");

router.get("/", TeacherController.index);

module.exports = router;
