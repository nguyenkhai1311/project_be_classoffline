module.exports = {
    login: (req, res) => {
        const message = req.flash("error");
        console.log(message);
        res.render("auth/login", {
            layout: "layouts/auth.layout.ejs",
            message,
        });
    },

    handleLogin: (req, res) => {
        res.redirect("/");
    },

    loginFacebook: (req, res) => {
        res.redirect("/");
    },

    loginGoogle: (req, res) => {
        res.redirect("/");
    },
};
