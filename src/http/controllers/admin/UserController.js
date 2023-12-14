const moment = require("moment");
const { PER_PAGE } = process.env;
const model = require("../../../models/index");
const User = model.User;

const moduleName = "Người dùng";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách người dùng";

        // Lấy tổng số bản ghi
        const totalCountObj = await User.findAndCountAll();
        const totalCount = totalCountObj.count;
        // Lấy tổng số trang
        const totalPage = Math.ceil(totalCount / PER_PAGE);

        // Lấy số trang
        let { page } = req.query;
        if (!page || page < 1) {
            page = 1;
        }

        if (page > totalPage) {
            page = totalPage;
        }
        const offset = page - 1;

        const users = await User.findAll({
            where: {
                typeId: 1,
            },
            attributes: [
                "id",
                "name",
                "email",
                "phone",
                "address",
                "createdAt",
            ],
            limit: +PER_PAGE,
            offset: offset,
        });

        res.render("admin/user/index", {
            users,
            moment,
            title,
            moduleName,
        });
    },

    add: async (req, res) => {
        const title = "Thêm người dùng";
        res.render("admin/user/add", { title, moduleName });
    },

    store: async (req, res) => {
        const { nameUser, emailUser, phoneUser, addressUser, typeId } =
            req.body;

        await User.create({
            name: nameUser,
            email: emailUser,
            phone: phoneUser,
            address: addressUser,
            typeId: typeId,
        });

        res.redirect("/admin/user");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const title = "Sửa người dùng";
        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        res.render("admin/user/edit", { user, title, moduleName });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nameUser, emailUser, phoneUser, addressUser, typeId } =
            req.body;

        await User.update(
            {
                name: nameUser,
                email: emailUser,
                phone: phoneUser,
                address: addressUser,
                typeId: typeId,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        res.redirect(`/admin/user/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        if (user) {
            await User.destroy({
                where: {
                    id: id,
                },
            });
        }

        res.redirect("/admin/user");
    },
};
