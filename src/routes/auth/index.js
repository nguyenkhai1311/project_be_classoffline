var express = require("express");
var router = express.Router();
const passport = require("passport");

const GuestMiddleware = require("../../http/middlewares/GuestMiddleware");

const AuthController = require("../../http/controllers/auth/AuthController");
const facebookRouter = require("./facebook");
const googleRouter = require("./google");

router.get("/login", GuestMiddleware, AuthController.login);
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth/login",
        failureFlash: true,
        badRequestMessage: "Không được để trống",
    }),
    AuthController.handleLogin
);

router.use("/", facebookRouter);
router.use("/", googleRouter);

module.exports = router;
