const model = require("../../models/index");
const LoginToken = model.LoginToken;

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        const tokenUser = await LoginToken.findOne({
            where: {
                token: token,
            },
        });

        if (tokenUser) {
            next();
        } else {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect("/auth/login");
            });
        }
    } else {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/auth/login");
        });
    }
};
