const moduleName = "Lịch trình";

module.exports = {
    index: (req, res) => {
        const title = "Lịch trình";
        res.render("admin/calendar/index", { title, moduleName });
    },
};
