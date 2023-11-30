const { Op } = require("sequelize");
const SendMail = require("../../../helpers/SendEmail");
const FormatDate = require("../../../helpers/FormatDate");

const model = require("../../../models/index");
const UserOtp = model.UserOtp;

module.exports = {
    login: (req, res) => {
        const message = req.flash("error");
        res.render("auth/login", {
            layout: "layouts/auth.layout.ejs",
            message,
        });
    },

    handleLogin: async (req, res) => {
        const { email } = req.body;
        const { id } = req.user;
        const user = UserOtp.findOne({
            where: {
                userId: id,
            },
        });
        if (user) {
            await UserOtp.destroy({
                where: {
                    userId: id,
                },
            });
        }
        const otp = Math.floor(Math.random() * 90000) + 10000; // otp có 5 chữ số
        const timeExpires = new Date(new Date().getTime() + 60000);
        SendMail(email, otp);
        await UserOtp.create({
            otp: otp,
            userId: id,
            expires: FormatDate(new Date(timeExpires)),
        });

        res.redirect("/auth/verification");
    },

    loginFacebook: (req, res) => {
        res.redirect("/");
    },

    loginGoogle: (req, res) => {
        res.redirect("/");
    },

    loginGithub: (req, res) => {
        res.redirect("/");
    },

    verification: (req, res) => {
        res.render("auth/verification", {
            layout: "layouts/auth.layout.ejs",
        });
    },

    handleVerification: async (req, res) => {
        const { otp } = req.body;
        const { id } = req.user;

        const user = await UserOtp.findOne({
            where: {
                [Op.and]: [{ otp: otp }, { userId: id }],
            },
        });

        if (user) {
            const timeMoment = new Date();
            const expires = user.expires;
            if (expires < timeMoment) {
                res.redirect("/auth/verification");
                return;
            }
            res.redirect("/");
            return;
        }
        res.redirect("/auth/verification");
    },

    logout: (req, res) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/auth/login");
        });
    },
};
