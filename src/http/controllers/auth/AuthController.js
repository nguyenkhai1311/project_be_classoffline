const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const md5 = require("md5");

const JWT_SECRET = process.env.JWT_SECRET;

const SendMail = require("../../../helpers/SendEmail");
const FormatDate = require("../../../helpers/FormatDate");

const model = require("../../../models/index");
const UserOtp = model.UserOtp;
const User = model.User;
const LoginToken = model.LoginToken;

const saltRounds = 10;

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

        req.flash("email", email);
        const userOtp = await UserOtp.findOne({
            where: {
                userId: id,
            },
        });
        if (userOtp) {
            await UserOtp.destroy({
                where: {
                    userId: id,
                },
            });
        }
        const otp = Math.floor(Math.random() * 90000) + 10000; // otp có 5 chữ số
        const timeExpires = new Date(new Date().getTime() + 60000);
        const html = "<b>Mã xác minh để đăng nhập: </b>" + otp;
        SendMail(email, html);
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
        const email = req.flash("email");
        req.flash("id", req.user.id);

        res.render("auth/verification", {
            layout: "layouts/auth.layout.ejs",
            email,
        });
    },

    handleVerification: async (req, res) => {
        const { numberOne, numberTwo, numberThree, numberFour, numberFive } =
            req.body;
        const id = req.flash("id");
        console.log("id" + id);
        const otp = `${numberOne}${numberTwo}${numberThree}${numberFour}${numberFive}`;

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

            const tokenUser = await LoginToken.findOne({
                where: {
                    userId: id,
                },
            });

            if (tokenUser) {
                await LoginToken.destroy({
                    where: {
                        userId: id,
                    },
                });
            }

            const token = md5(new Date() + Math.random());
            await LoginToken.create({
                token: token,
                userId: id,
            });
            res.cookie("token", token, { maxAge: 900000, httpOnly: true });

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

    forgotPassword: (req, res) => {
        res.render("auth/forgotPassword", {
            layout: "layouts/auth.layout.ejs",
        });
    },

    handleForgotPassword: async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: user,
            },
            JWT_SECRET
        );
        const link = `http://localhost:3000/auth/reset?token=${token}`;
        const html = `<b>Vui lòng click vào đây để lấy lại mật khẩu <a href="${link}">tại đây</a></b>`;
        SendMail(email, html);
        res.redirect("/auth/login");
    },

    reset: (req, res) => {
        const { token } = req.query;
        req.flash("token", token);

        res.render("auth/resetPassword", {
            layout: "layouts/auth.layout.ejs",
        });
    },

    handleReset: async (req, res) => {
        const token = req.flash("token");
        const { password, repassword } = req.body;
        if (password === repassword) {
            try {
                const decoded = jwt.verify(token[0], JWT_SECRET);
                await User.update(
                    { password: bcrypt.hashSync(password, saltRounds) },
                    {
                        where: {
                            email: decoded.data.email,
                        },
                    }
                );
            } catch (err) {
                console.log(err);
            }
            res.redirect("/auth/login");
        } else {
            res.redirect("/auth/reset");
        }
    },
};
