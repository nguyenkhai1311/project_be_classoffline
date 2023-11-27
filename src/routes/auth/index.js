var express = require("express");
var router = express.Router();

const AuthController = require("../../http/controllers/auth/AuthController");

router.get("/login", AuthController.login);
router.post("/login", AuthController.handleLogin);

module.exports = router;
