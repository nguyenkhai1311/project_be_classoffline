// const model = require("../../../models/index");
// console.log(model);
const title = "Dashboard";
let moduleName;

module.exports = {
    index: (req, res) => {
        res.render("students/home/index", { title, moduleName });
    },
};
