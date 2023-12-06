var express = require("express");
var routes = express.Router();
const passport = require("passport");

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

routes.get("/github/redirect", passport.authenticate("connect-github"));

routes.get(
    "/github/callback",
    passport.authenticate("connect-github", {
        failureRedirect: "/auth/login",
        failureMessage: true,
        successRedirect: "/admin/profile",
    })
);

module.exports = routes;
