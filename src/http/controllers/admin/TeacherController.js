const moduleName = "Giảng viên";

module.exports = {
    index: (req, res) => {
        const title = "Danh sách giảng viên";
        res.render("admin/teacher/index", { title, moduleName });
    },
};
