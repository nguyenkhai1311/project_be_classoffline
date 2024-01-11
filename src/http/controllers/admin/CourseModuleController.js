const moduleName = "Tài Liệu";

module.exports = {
    index: (req, res) => {
        const title = "Thêm tài liệu";
        res.render("admin/courseModule/index", { title, moduleName });
    },
};
