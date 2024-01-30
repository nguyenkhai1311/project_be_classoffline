const moduleName = "Role";

module.exports = {
    index: (req, res) => {
        const title = "Danh sách Role";
        res.render("admin/role/index", { title, moduleName });
    },
};
