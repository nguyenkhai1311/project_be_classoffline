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

const moduleName = "Giảng viên";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách giảng viên";
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
                    name: "Teacher",
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
        const teachers = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Teacher",
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

        res.render("admin/teacher/index", {
            req,
            teachers,
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
        const title = "Thêm giảng viên";
        const errors = req.flash("errors");

        res.render("admin/teacher/add", {
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
                    name: "Teacher",
                },
            });
            await User.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
                typeId: type.id,
            });
            res.redirect("/admin/teachers");
            return;
        }
        req.flash("errors", result.errors);
        res.redirect("/admin/teachers/add");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const title = "Sửa giảng viên";
        const teacher = await User.findOne({
            where: {
                id: id,
            },
        });
        res.render("admin/teacher/edit", { teacher, title, moduleName });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const type = await Type.findOne({
            where: {
                name: "Teacher",
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
        res.redirect(`/admin/teachers/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const teacher = await User.findOne({
            where: {
                id: id,
            },
        });
        if (teacher) {
            await User.destroy({
                where: {
                    id: id,
                },
            });
        }
        res.redirect("/admin/teachers");
    },

    destroyAll: async (req, res) => {
        const { listTeacherDelete } = req.body;
        const listIdTeacher = listTeacherDelete.split(",");
        await User.destroy({
            where: {
                id: {
                    [Op.in]: listIdTeacher,
                },
            },
        });
        res.redirect("/admin/teachers");
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
