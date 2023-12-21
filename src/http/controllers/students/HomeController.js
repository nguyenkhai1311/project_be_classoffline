const title = "Dashboard";
let moduleName = "Tổng quan";

module.exports = {
    index: (req, res) => {
        res.render("students/home/index", { title, moduleName });
    },
};
