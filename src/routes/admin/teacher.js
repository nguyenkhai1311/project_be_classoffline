var express = require("express");
var router = express.Router();

const TeacherController = require("../../http/controllers/admin/TeacherController");
const UserValidate = require("../../http/middlewares/UserValidate");

router.get("/", TeacherController.index);
router.get("/add", TeacherController.add);
router.post("/add", UserValidate(), TeacherController.store);

router.get("/edit/:id", TeacherController.edit);
router.patch("/edit/:id", TeacherController.update);

router.delete("/delete/:id", TeacherController.destroy);
router.delete("/deleteAll", TeacherController.destroyAll);

module.exports = router;
