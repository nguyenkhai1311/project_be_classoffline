var express = require("express");
var router = express.Router();

const ProfileController = require("../../http/controllers/admin/ProfileController");

router.get("/", ProfileController.profile);
router.get("/update", ProfileController.edit);
router.post("/update", ProfileController.update);

module.exports = router;
