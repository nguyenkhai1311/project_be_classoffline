const moment = require("moment");

const date = require("../../../utils/date");
const model = require("../../../models/index");
const User = model.User;
const Type = model.Type;
const Course = model.Course;
const Class = model.Class;
const ScheduleClass = model.ScheduleClass;

const moduleName = "Lớp học";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách lớp học";
        const scheduleClass = await ScheduleClass.findAll({
            include: {
                model: Class,
            },
        });
        const classes = await Class.findAll();
        res.render("admin/class/index", {
            title,
            moduleName,
            moment,
            scheduleClass,
            classes,
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
            classStartDate,
            course.duration,
            classSchedule.length
        );

        const statusClass = await Class.create({
            name: className,
            quantity: classQuantity,
            startDate: classStartDate,
            endDate: classEndDate,
            courseId: courseId,
        });

        for (let index = 0; index < classSchedule.length; index++) {
            await ScheduleClass.create({
                schedule: classSchedule[index],
                timeLearn: `${timeLearnStart[index]} - ${timeLearnEnd[index]}`,
                classId: statusClass.id,
            });
        }
        res.redirect("/admin/classes");
    },

    edit: async (req, res) => {
        const title = "Sửa lớp học";
        const { id } = req.params;

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const courses = await Course.findAll();
        console.log(moment(classVal.startDate).format("MM/DD/YYYY"));
        res.render("admin/class/edit", {
            title,
            moduleName,
            classVal,
            courses,
            moment,
        });
    },
};
