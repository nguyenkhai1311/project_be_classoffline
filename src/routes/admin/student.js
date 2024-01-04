var express = require("express");
var router = express.Router();

const StudentController = require("../../http/controllers/admin/StudentController");
const UserValidate = require("../../http/middlewares/UserValidate");

router.get("/", StudentController.index);
router.get("/add", StudentController.add);
router.post("/add", UserValidate(), StudentController.store);

router.get("/edit/:id", StudentController.edit);
router.patch("/edit/:id", StudentController.update);

router.delete("/delete/:id", StudentController.destroy);
router.delete("/deleteAll", StudentController.destroyAll);

module.exports = router;
