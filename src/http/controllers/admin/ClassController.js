const moment = require("moment");

const date = require("../../../utils/date");
const moduleName = "Lớp học";

module.exports = {
    index: (req, res) => {
        const title = "Danh sách lớp học";

        const endDate = date.getEndDate(new Date(), 48, 2);
        res.render("admin/class/index", {
            title,
            moduleName,
            endDate,
            moment,
        });
    },

    add: (req, res) => {
        const title = "Thêm lớp học";
        res.render("admin/class/add", { title, moduleName });
    },
};
