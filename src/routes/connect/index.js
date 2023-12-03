var express = require("express");
var routes = express.Router();

routes.get("/", (req, res) => {
    res.send("Teacher");
});

module.exports = routes;
