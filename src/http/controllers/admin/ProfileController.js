const bcrypt = require("bcrypt");
const model = require("../../../models/index");
const User = model.User;
const UserSocial = model.UserSocial;

const saltRounds = 10;
const moduleName = "Tài khoản";

module.exports = {
    profile: async (req, res) => {
        const title = "Thông tin tài khoản";
        const moduleName = "Tài Khoản";
        const { id } = req.user;
        const users = await UserSocial.findAll({
            where: {
                userId: id,
            },
        });
        res.render("admin/profile/index", {
            users,
            title,
            moduleName,
        });
    },

    changePassword: (req, res) => {
        const title = "Đổi mật khẩu";
        const message = req.flash("message");
        res.render("admin/profile/changePassword", {
            message,
            title,
            moduleName,
        });
    },

    handleChangePassword: async (req, res) => {
        const { id } = req.user;
        const { passwordOld, passwordNew, repasswordNew } = req.body;

        const user = await User.findOne({
            where: {
                id: id,
            },
        });

        const passwordStatus = bcrypt.compareSync(passwordOld, user.password);

        if (!passwordStatus) {
            req.flash("message", "Mật khẩu cũ không chính xác!");
            res.redirect("/admin/changePassword");
            return;
        }
        if (passwordNew !== repasswordNew) {
            req.flash("message", "Mật khẩu mới nhập lại không khớp!");
            res.redirect("/admin/changePassword");
            return;
        }

        const password = bcrypt.hashSync(passwordNew, saltRounds);

        await User.update(
            { password: password },
            {
                where: {
                    id: id,
                },
            }
        );
        req.flash("message", "Đổi mật khẩu thành công!");
        res.redirect("/admin/changePassword");
    },
};
