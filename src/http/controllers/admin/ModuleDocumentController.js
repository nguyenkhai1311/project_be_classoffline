const model = require("../../../models/index");
const Course = model.Course;
const CourseModule = model.CourseModule;
const ModuleDocument = model.ModuleDocument;

const moduleName = "Tài liệu";

module.exports = {
    add: async (req, res) => {
        const title = "Thêm nội dung tài liệu";
        const courseModule = await CourseModule.findAll({
            include: {
                model: Course,
            },
        });
        res.render("admin/moduleDocument/add", {
            title,
            moduleName,
            courseModule,
        });
    },

    store: async (req, res) => {
        const courseId = req.flash("courseId").slice(-1);
        const { documentContent, pathName, moduleId } = req.body;

        await ModuleDocument.create({
            content: documentContent,
            pathName: pathName,
            moduleId: moduleId,
        });
        res.redirect(`/admin/courses/detail/${courseId}`);
    },

    edit: async (req, res) => {
        const title = "Sửa nội dung tài liệu";
        const { id } = req.params;
        const moduleDocument = await ModuleDocument.findOne({
            where: {
                id: id,
            },
        });
        const courseModule = await CourseModule.findAll({
            include: {
                model: Course,
            },
        });
        res.render("admin/moduleDocument/edit", {
            title,
            moduleName,
            moduleDocument,
            courseModule,
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { documentContent, pathName, moduleId } = req.body;
        await ModuleDocument.update(
            {
                content: documentContent,
                pathName: pathName,
                moduleId: moduleId,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.redirect(`/admin/module-documents/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const courseId = req.flash("courseId").slice(-1);
        await ModuleDocument.destroy({
            where: {
                id: id,
            },
        });
        res.redirect(`/admin/courses/detail/${courseId}`);
    },
};
