var express = require("express");
var routes = express.Router();
const passport = require("passport");

const AuthController = require("../../http/controllers/auth/AuthController");

routes.get(
    "/facebook/redirect",
    passport.authenticate("connectFacebook", { authType: "reauthenticate" })
);

routes.get(
    "/facebook/callback",
    passport.authenticate("connectFacebook", {
        failureRedirect: "/auth/login",
        failureMessage: true,
        successRedirect: "/admin/profile",
    })
);

routes.get(
    "/google/redirect",
    passport.authenticate("connectGoogle", {
        prompt: "select_account",
    })
);

routes.get(
    "/google/callback",
    passport.authenticate("connectGoogle", {
        failureRedirect: "/auth/login",
        failureMessage: true,
        successRedirect: "/admin/profile",
    })
);

routes.get("/facebook/destroy", AuthController.disconnectFacebook);
routes.get("/google/destroy", AuthController.disconnectGoogle);
routes.get("/github/destroy", AuthController.disconnectGithub);

module.exports = routes;
