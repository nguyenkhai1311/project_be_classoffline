var express = require("express");
var router = express.Router();

const UserController = require("../../http/controllers/admin/UserController");

router.get("/", UserController.index);
router.get("/add", UserController.add);
router.post("/add", UserController.store);

router.get("/edit/:id", UserController.edit);
router.post("/edit/:id", UserController.update);

module.exports = router;
