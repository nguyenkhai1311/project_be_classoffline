const moduleName = "Cài đặt";

module.exports = {
    index: (req, res) => {
        const title = "Thiết lập cài đặt";
        res.render("admin/settings/index", {
            title,
            moduleName,
        });
    },
};
