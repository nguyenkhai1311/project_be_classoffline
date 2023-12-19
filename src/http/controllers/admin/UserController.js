const moment = require("moment");
const { PER_PAGE } = process.env;
const { Op } = require("sequelize");

const { getPaginateUrl } = require("../../../utils/url");
const model = require("../../../models/index");
const User = model.User;

const moduleName = "Người dùng";

module.exports = {
    index: async (req, res) => {
        const filters = {};
        const title = "Danh sách người dùng";
        let { keyword, page, recordNumber } = req.query;
        // Lấy tổng số bản ghi
        const totalCountObj = await User.findAndCountAll();
        const totalCount = totalCountObj.count;
        // Lấy tổng số trang
        const totalPage = Math.ceil(totalCount / PER_PAGE);

        console.log(recordNumber);

        // Tìm những người có quyền quản trị
        filters.typeId = 1;

        if (keyword) {
            filters[Op.or] = [
                {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
                {
                    email: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            ];
        }
        console.log(`Filters: `);
        console.log(filters);
        // Lấy số trang
        if (!page || page < 1) {
            page = 1;
        }

        if (page > totalPage) {
            page = totalPage;
        }
        const offset = (page - 1) * PER_PAGE;

        const users = await User.findAll({
            where: filters,
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
            req,
            users,
            moment,
            title,
            moduleName,
            totalPage,
            page,
            getPaginateUrl,
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
