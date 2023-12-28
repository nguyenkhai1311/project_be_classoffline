var express = require("express");
var router = express.Router();

const ClassController = require("../../http/controllers/admin/ClassController");

router.get("/", ClassController.index);
router.get("/add", ClassController.add);

module.exports = router;
