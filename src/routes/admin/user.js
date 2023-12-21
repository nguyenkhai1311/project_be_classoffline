var express = require("express");
var router = express.Router();

const UserController = require("../../http/controllers/admin/UserController");
const UserValidate = require("../../http/middlewares/UserValidate");

router.get("/", UserController.index);
router.post("/", UserController.index);
router.get("/add", UserController.add);
router.post("/add", UserValidate(), UserController.store);

router.get("/edit/:id", UserController.edit);
router.patch("/edit/:id", UserController.update);

router.delete("/delete/:id", UserController.destroy);

module.exports = router;
