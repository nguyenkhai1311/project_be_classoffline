module.exports = {
    login: (req, res) => {
        res.render("auth/login", {
            layout: "layouts/auth.layout.ejs",
        });
    },

    handleLogin: (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        res.send("Đăng nhập");
    },
};
