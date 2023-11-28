var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../../http/controllers/auth/AuthController");

router.get("/google/redirect", passport.authenticate("google"));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    AuthController.loginGoogle
);

module.exports = router;
