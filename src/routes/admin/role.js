var express = require("express");
var router = express.Router();

const RoleController = require("../../http/controllers/admin/RoleController");

router.get("/", RoleController.index);

module.exports = router;
