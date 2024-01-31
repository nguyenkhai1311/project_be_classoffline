var express = require("express");
var router = express.Router();

const RoleController = require("../../http/controllers/admin/RoleController");

router.get("/", RoleController.index);

router.get("/add", RoleController.add);
router.post("/add", RoleController.create);

router.get("/edit/:id", RoleController.edit);
router.patch("/edit/:id", RoleController.update);

router.delete("/delete/:id", RoleController.destroy);

module.exports = router;
