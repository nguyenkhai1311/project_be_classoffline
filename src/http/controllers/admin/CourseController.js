const model = require("../../../models/index");
const User = model.User;
const Type = model.Type;

const moduleName = "Khóa học";

module.exports = {
    index: (req, res) => {
        const title = "Danh sách khóa học";
        res.render("admin/course/index", {
            title,
            moduleName,
        });
    },

    add: async (req, res) => {
        const title = "Thêm khóa học";
        const teachers = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Teacher",
                },
            },
        });
        res.render("admin/course/add", {
            title,
            moduleName,
            teachers,
        });
    },

    store: async (req, res) => {},
};
