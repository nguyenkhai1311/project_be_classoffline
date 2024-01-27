const moment = require("moment");
const { Op } = require("sequelize");

const constants = require("../../../constants/index");
const exportFile = require("../../../utils/exportFile");
const importFile = require("../../../utils/importFile");
const { getPaginateUrl } = require("../../../utils/url");
const date = require("../../../utils/date");

const model = require("../../../models/index");
const Course = model.Course;
const Class = model.Class;
const ScheduleClass = model.ScheduleClass;
const User = model.User;
const Type = model.Type;
const StudentsClass = model.StudentsClass;

const moduleName = "Lớp học";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách lớp học";
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
            ];
        }

        // Lấy tổng số bản ghi
        const totalCountObj = await Class.findAndCountAll({
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

        const scheduleClass = await ScheduleClass.findAll({
            include: {
                model: Class,
            },
        });
        const classes = await Class.findAll({
            where: filters,
            limit: +recordNumber,
            offset: offset,
        });

        res.render("admin/class/index", {
            req,
            title,
            moduleName,
            moment,
            scheduleClass,
            classes,
            recordNumber,
            page,
            totalPage,
            getPaginateUrl,
        });
    },

    add: async (req, res) => {
        const title = "Thêm lớp học";
        const courses = await Course.findAll();

        res.render("admin/class/add", { title, moduleName, courses });
    },

    store: async (req, res) => {
        const {
            className,
            classQuantity,
            classStartDate,
            classSchedule,
            courseId,
            timeLearnStart,
            timeLearnEnd,
        } = req.body;

        const course = await Course.findOne({
            where: {
                id: courseId,
            },
        });

        const classEndDate = date.getEndDate(
            classStartDate, // Ngày bắt đầu
            course.duration, // Tổng số buổi học của 1 khóa
            classSchedule.length // Tổng số buổi học trong 1 tuần
        );

        const statusClass = await Class.create({
            name: className,
            quantity: classQuantity,
            startDate: classStartDate,
            endDate: classEndDate,
            courseId: courseId,
        });

        if (classSchedule.length === 1) {
            await ScheduleClass.create({
                schedule: classSchedule,
                timeLearn: `${timeLearnStart} - ${timeLearnEnd}`,
                classId: statusClass.id,
            });
        } else {
            for (let index = 0; index < classSchedule.length; index++) {
                await ScheduleClass.create({
                    schedule: classSchedule[index],
                    timeLearn: `${timeLearnStart[index]} - ${timeLearnEnd[index]}`,
                    classId: statusClass.id,
                });
            }
        }

        res.redirect("/admin/classes");
    },

    edit: async (req, res) => {
        const title = "Sửa lớp học";
        const { id } = req.params;
        let scheduleVal = [];
        let scheduleValStart = [];
        let scheduleValEnd = [];

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const courses = await Course.findAll();

        const scheduleClass = await ScheduleClass.findAll({
            where: {
                classId: id,
            },
        });

        scheduleClass.forEach(({ schedule, timeLearn }) => {
            scheduleVal.push(schedule);
            scheduleValStart.push(`${schedule} - ${timeLearn.split(" - ")[0]}`);
            scheduleValEnd.push(`${schedule} - ${timeLearn.split(" - ")[1]}`);
        });

        res.render("admin/class/edit", {
            title,
            moduleName,
            classVal,
            courses,
            moment,
            scheduleVal,
            scheduleValStart,
            scheduleValEnd,
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const {
            className,
            classQuantity,
            classStartDate,
            classSchedule,
            courseId,
            timeLearnStart,
            timeLearnEnd,
        } = req.body;

        const course = await Course.findOne({
            where: {
                id: courseId,
            },
        });

        const classEndDate = date.getEndDate(
            classStartDate, // Ngày bắt đầu
            course.duration, // Tổng số buổi học của 1 khóa
            classSchedule.length // Tổng số buổi học trong 1 tuần
        );

        await Class.update(
            {
                name: className,
                quantity: classQuantity,
                startDate: classStartDate,
                endDate: classEndDate,
                courseId: courseId,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        await ScheduleClass.destroy({
            where: {
                classId: id,
            },
        });
        if (classSchedule.length === 1) {
            await ScheduleClass.create({
                schedule: classSchedule,
                timeLearn: `${timeLearnStart} - ${timeLearnEnd}`,
                classId: id,
            });
        } else {
            for (let index = 0; index < classSchedule.length; index++) {
                await ScheduleClass.create({
                    schedule: classSchedule[index],
                    timeLearn: `${timeLearnStart[index]} - ${timeLearnEnd[index]}`,
                    classId: id,
                });
            }
        }

        res.redirect(`/admin/classes/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        if (classVal) {
            await Class.destroy({
                where: {
                    id: id,
                },
            });
        }
        res.redirect("/admin/classes");
    },

    destroyAll: async (req, res) => {
        const { listClassDelete } = req.body;
        const listIdClass = listClassDelete.split(",");
        await Class.destroy({
            where: {
                id: {
                    [Op.in]: listIdClass,
                },
            },
        });
        res.redirect("/admin/classes");
    },

    export: async (req, res) => {
        const scheduleClass = await ScheduleClass.findAll({
            include: {
                model: Class,
            },
        });
        scheduleClass.forEach((value, index) => {
            scheduleClass[index].dataValues.className = value.Class.name;
            scheduleClass[index].dataValues.quantity = value.Class.quantity;
            scheduleClass[index].dataValues.startDate = value.Class.startDate;
            scheduleClass[index].dataValues.endDate = value.Class.endDate;
        });
        const columns = constants.classColumnFile;
        const date = new Date().getTime();
        const fileName = `classes_${date}.xlsx`;
        exportFile(res, scheduleClass, "Classes", fileName, columns);
    },

    import: (req, res) => {
        const title = "Import File Class";
        res.render("admin/class/import", { title, moduleName });
    },

    handleImport: async (req, res) => {
        const file = req.file;
        const data = await importFile(file.path);

        for (let index = 0; index < data.length; index++) {
            const course = await Course.findOne({
                where: {
                    name: data[index].column_5,
                },
            });
            if (course) {
                const classInfor = await Class.findOne({
                    where: {
                        name: data[index].column_1,
                    },
                });
                if (!classInfor) {
                    await Class.create({
                        name: data[index].column_1,
                        quantity: data[index].column_2,
                        startDate: data[index].column_3,
                        endDate: data[index].column_4,
                        courseId: course.id,
                    });
                }
                const classVal = await Class.findOne({
                    where: {
                        name: data[index].column_1,
                    },
                });
                await ScheduleClass.create({
                    schedule: data[index].column_6,
                    timeLearn: data[index].column_7,
                    classId: classVal.id,
                });
            }
        }
        res.redirect("/admin/classes");
    },

    detail: async (req, res) => {
        const title = "Chi tiết lớp học";
        const { id } = req.params;
        req.flash("classId", id);

        const classInfor = await Class.findOne({
            where: {
                id: id,
            },
        });
        const scheduleClass = await ScheduleClass.findAll({
            where: {
                classId: id,
            },
        });

        const students = await StudentsClass.findAll({
            include: {
                model: User,
            },
            where: {
                classId: id,
            },
        });

        res.render("admin/class/detail", {
            title,
            moduleName,
            classInfor,
            students,
            moment,
            scheduleClass,
        });
    },

    calendar: async (req, res) => {
        const title = "Lịch học";
        const { id } = req.params;
        const scheduleClass = await ScheduleClass.findAll({
            include: {
                model: Class,
            },
            where: {
                classId: id,
            },
        });
        res.render("admin/class/calendar", {
            title,
            moduleName,
            scheduleClass,
        });
    },

    listTeacher: async (req, res) => {
        const title = "Danh sách giảng viên, trợ giảng";
        const teachers = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: {
                        [Op.or]: ["Teacher", "TA"],
                    },
                },
            },
        });
        res.render("admin/class/teacherList", { title, moduleName, teachers });
    },

    listStudent: async (req, res) => {
        const title = "Danh sách học viên";
        const error = req.flash("error");

        const students = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Student",
                },
            },
        });
        res.render("admin/class/studentList", {
            title,
            moduleName,
            error,
            students,
        });
    },

    addStudent: async (req, res) => {
        const { listUser } = req.body;
        const classId = req.flash("classId").slice(-1);
        if (listUser.length === 1) {
            await StudentsClass.create({
                studentId: listUser,
                classId: classId,
                statusId: 1,
            });
        } else if (listUser.length > 1) {
            listUser.forEach(async (userId) => {
                await StudentsClass.create({
                    studentId: userId,
                    classId: classId,
                    statusId: 1,
                });
            });
        } else {
            const error = "Chưa có học viên trong hệ thống";
            req.flash("error", error);
            return res.redirect("/admin/classes/students");
        }
        res.redirect(`/admin/classes/detail/${classId}`);
    },
};
