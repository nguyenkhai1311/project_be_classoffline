var express = require("express");
var router = express.Router();

const CourseController = require("../../http/controllers/admin/CourseController");

router.get("/", CourseController.index);

router.get("/add", CourseController.add);
router.post("/add", CourseController.store);

router.get("/edit/:id", CourseController.edit);
router.patch("/edit/:id", CourseController.update);

router.delete("/delete/:id", CourseController.destroy);

router.get("/detail", CourseController.detail);

module.exports = router;
