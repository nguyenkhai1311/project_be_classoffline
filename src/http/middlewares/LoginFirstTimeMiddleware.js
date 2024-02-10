module.exports = (req, res, next) => {
    console.log("Userrrr", req.user.firstLogin);

    if (!req.user.firstLogin) {
        return res.render("auth/firstLogin", {
            layout: "layouts/auth.layout.ejs",
        });
    }

    next();
};
