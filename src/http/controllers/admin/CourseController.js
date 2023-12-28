const { Op } = require("sequelize");

const { getPaginateUrl } = require("../../../utils/url");
const model = require("../../../models/index");
const User = model.User;
const Type = model.Type;
const Course = model.Course;

const moduleName = "Khóa học";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách khóa học";
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
                    "$User.name$": {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            ];
        }

        // Lấy tổng số bản ghi
        const totalCountObj = await Course.findAndCountAll({
            include: {
                model: User,
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
        if (page > totalPage) {
            page = totalPage;
        }

        const offset = (page - 1) * recordNumber;

        const courses = await Course.findAll({
            include: {
                model: User,
            },
            where: filters,
            limit: +recordNumber,
            offset: offset,
        });
        res.render("admin/course/index", {
            req,
            title,
            moduleName,
            courses,
            recordNumber,
            page,
            totalPage,
            getPaginateUrl,
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

    store: async (req, res) => {
        const {
            courseName,
            coursePrice,
            teacherId,
            tryLearn,
            courseQuantity,
            courseDuration,
        } = req.body;

        await Course.create({
            name: courseName,
            price: coursePrice,
            teacherId: teacherId,
            tryLearn: tryLearn,
            quantity: courseQuantity,
            duration: courseDuration,
        });

        res.redirect("/admin/courses");
    },

    edit: async (req, res) => {
        const title = "Sửa khóa học";
        const { id } = req.params;
        const course = await Course.findOne({
            include: {
                model: User,
            },
            where: {
                id: id,
            },
        });
        const teacherName = course.User.name;

        const teachers = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Teacher",
                },
            },
        });

        res.render("admin/course/edit", {
            title,
            moduleName,
            course,
            teacherName,
            teachers,
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const {
            courseName,
            coursePrice,
            teacherId,
            tryLearn,
            courseQuantity,
            courseDuration,
        } = req.body;

        await Course.update(
            {
                name: courseName,
                price: coursePrice,
                teacherId: teacherId,
                tryLearn: tryLearn,
                quantity: courseQuantity,
                duration: courseDuration,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.redirect(`/admin/courses/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const course = await Course.findOne({
            where: {
                id: id,
            },
        });

        if (course) {
            await Course.destroy({
                where: {
                    id: id,
                },
            });
        }
        res.redirect("/admin/courses");
        1;
    },

    destroyAll: async (req, res) => {
        const { listCourseDelete } = req.body;
        const listIdCourse = listCourseDelete.split(",");
        console.log(listIdCourse);
        await Course.destroy({
            where: {
                id: {
                    [Op.in]: listIdCourse,
                },
            },
        });
        res.redirect("/admin/courses");
    },

    detail: async (req, res) => {
        const title = "Chi tiết khóa học";
        res.render("admin/course/detail", {
            title,
            moduleName,
        });
    },
};
