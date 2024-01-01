var express = require("express");
var router = express.Router();

const ClassController = require("../../http/controllers/admin/ClassController");

router.get("/", ClassController.index);
router.get("/add", ClassController.add);
router.post("/add", ClassController.store);

router.get("/edit/:id", ClassController.edit);

module.exports = router;
