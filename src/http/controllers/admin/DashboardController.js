module.exports = {
    index: (req, res) => {
        const title = "Dashboard";
        res.render("admin/dashboard/index", { title });
    },
};
