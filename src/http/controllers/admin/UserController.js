const moment = require("moment");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const constants = require("../../../constants/index");
const exportFile = require("../../../utils/exportFile");
const importFile = require("../../../utils/importFile");
const { getPaginateUrl } = require("../../../utils/url");
const validate = require("../../../utils/validate");
const model = require("../../../models/index");
const User = model.User;
const Type = model.Type;

const moduleName = "Người dùng";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách người dùng";
        const filters = {};

        let { keyword, page, recordNumber } = req.query;
        if (!recordNumber) {
            recordNumber = 5;
        }

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

        // Lấy tổng số bản ghi
        const totalCountObj = await User.findAndCountAll({
            include: {
                model: Type,
                where: {
                    name: "Admin",
                },
            },
            where: filters,
        });
        // Lấy tổng số trang
        const totalCount = totalCountObj.count;
        const totalPage = Math.ceil(totalCount / recordNumber);
        // Lấy số trang
        if (!page || page < 1) {
            page = 1;
        }
        if (page > totalPage && page > 1) {
            page = totalPage;
        }

        const offset = (page - 1) * recordNumber;
        const users = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Admin",
                },
            },
            where: filters,
            attributes: [
                "id",
                "name",
                "email",
                "phone",
                "address",
                "createdAt",
            ],
            limit: +recordNumber,
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
            recordNumber,
            getPaginateUrl,
        });
    },

    add: async (req, res) => {
        const title = "Thêm người dùng";
        const errors = req.flash("errors");

        res.render("admin/user/add", {
            title,
            moduleName,
            errors,
            validate,
        });
    },

    store: async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const { name, email, phone, address } = req.body;
            const type = await Type.findOne({
                where: {
                    name: "Admin",
                },
            });
            await User.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
                typeId: type.id,
            });
            res.redirect("/admin/users");
            return;
        }
        req.flash("errors", result.errors);
        res.redirect("/admin/users/add");
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
        const { name, email, phone, address } = req.body;
        const type = await Type.findOne({
            where: {
                name: "Admin",
            },
        });
        await User.update(
            {
                name: name,
                email: email,
                phone: phone,
                address: address,
                typeId: type.id,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.redirect(`/admin/users/edit/${id}`);
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
        res.redirect("/admin/users");
    },

    destroyAll: async (req, res) => {
        const { listUserDelete } = req.body;
        const listIdUser = listUserDelete.split(",");
        await User.destroy({
            where: {
                id: {
                    [Op.in]: listIdUser,
                },
            },
        });
        res.redirect("/admin/users");
    },

    export: async (req, res) => {
        const user = await User.findAll({
            where: {
                typeId: 1,
            },
        });
        const columns = constants.userColumnFile;
        const date = new Date().getTime();
        const fileName = `user_admin_${date}.xlsx`;
        exportFile(res, user, "User_Admin", fileName, columns);
    },

    import: (req, res) => {
        const title = "Import File";
        res.render("admin/user/import", { title, moduleName });
    },

    handleImport: async (req, res) => {
        const file = req.file;
        console.log("Tên file", file);
        const data = await importFile(file.path);
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            await User.create({
                name: data[index].column_1,
                email: data[index].column_2.text,
                phone: data[index].column_3,
                address: data[index].column_4,
                typeId: data[index].column_5,
            });
        }
        res.redirect("/admin/users");
    },
};
