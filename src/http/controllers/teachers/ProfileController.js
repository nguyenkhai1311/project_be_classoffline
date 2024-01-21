const moduleName = "Tài khoản";

module.exports = {
    index: (req, res) => {
        const title = "Thông tin cá nhân";
        res.render("teacher/profile/index", { title, moduleName });
    },
};
