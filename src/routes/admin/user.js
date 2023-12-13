var express = require("express");
var router = express.Router();

const UserController = require("../../http/controllers/admin/UserController");

router.get("/", UserController.index);
router.get("/add", UserController.add);
router.post("/add", UserController.store);

module.exports = router;
