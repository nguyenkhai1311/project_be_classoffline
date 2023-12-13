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
        console.log(users);
        res.render("admin/user/index", { users, moment });
    },

    add: async (req, res) => {
        res.render("admin/user/add");
    },

    store: async (req, res) => {
        res.send("/admin/user");
    },
};
