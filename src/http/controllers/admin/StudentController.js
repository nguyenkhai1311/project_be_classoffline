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

const moduleName = "Học viên";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách học viên";
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
                    name: "Student",
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
        const students = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Student",
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

        res.render("admin/student/index", {
            req,
            students,
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
        const title = "Thêm học viên";
        const errors = req.flash("errors");

        res.render("admin/student/add", {
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
                    name: "Student",
                },
            });
            await User.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
                typeId: type.id,
            });
            res.redirect("/admin/students");
            return;
        }
        req.flash("errors", result.errors);
        res.redirect("/admin/students/add");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const title = "Sửa học viên";
        const student = await User.findOne({
            where: {
                id: id,
            },
        });
        res.render("admin/student/edit", { student, title, moduleName });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const type = await Type.findOne({
            where: {
                name: "Student",
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
        res.redirect(`/admin/students/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const student = await User.findOne({
            where: {
                id: id,
            },
        });
        if (student) {
            await User.destroy({
                where: {
                    id: id,
                },
            });
        }
        res.redirect("/admin/students");
    },

    destroyAll: async (req, res) => {
        const { listStudentDelete } = req.body;
        const listIdStudent = listStudentDelete.split(",");
        await User.destroy({
            where: {
                id: {
                    [Op.in]: listIdStudent,
                },
            },
        });
        res.redirect("/admin/students");
    },

    detail: async (req, res) => {
        const title = "Chi tiết học viên";

        res.render("admin/student/detail", { title, moduleName });
    },

    export: async (req, res) => {
        const students = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Student",
                },
            },
        });
        const columns = constants.studentColumnFile;
        const date = new Date().getTime();
        const fileName = `User_Student_${date}.xlsx`;
        exportFile(res, students, "User_Student", fileName, columns);
    },

    import: (req, res) => {
        const title = "Import File Student";
        res.render("admin/student/import", { title, moduleName });
    },

    handleImport: async (req, res) => {
        const file = req.file;
        const data = await importFile(file.path);
        const type = await Type.findOne({
            where: {
                name: "Student",
            },
        });
        for (let index = 0; index < data.length; index++) {
            await User.create({
                name: data[index].column_1,
                email: data[index].column_2.text,
                phone: data[index].column_3,
                address: data[index].column_4,
                typeId: type.id,
            });
        }
        res.redirect("/admin/students");
    },
};
