const moment = require("moment");

const model = require("../../../models/index");
const User = model.User;

module.exports = {
    index: async (req, res) => {
        const users = await User.findAll({
            attributes: [
                "id",
                "name",
                "email",
                "phone",
                "address",
                "createdAt",
            ],
        });
        res.render("admin/user/index", { users, moment });
    },

    add: async (req, res) => {
        res.render("admin/user/add");
    },

    store: async (req, res) => {
        const { nameUser, emailUser, phoneUser, addressUser, type } = req.body;
        if (type === "Admin") {
            await User.create({
                name: nameUser,
                email: emailUser,
                phone: phoneUser,
                address: addressUser,
                typeId: 1,
            });
        }

        if (type === "Teacher") {
            await User.create({
                name: nameUser,
                email: emailUser,
                phone: phoneUser,
                address: addressUser,
                typeId: 2,
            });
        }

        if (type === "Student") {
            await User.create({
                name: nameUser,
                email: emailUser,
                phone: phoneUser,
                address: addressUser,
                typeId: 3,
            });
        }

        if (type === "") {
            req.flash("error", "Không được để trống");
        }

        res.redirect("/admin/user");
    },

    edit: async (req, res) => {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        res.render("admin/user/edit", { user });
    },

    update: async (req, res) => {
        const { id } = req.params;
        res.send(`${id}`);
    },
};
