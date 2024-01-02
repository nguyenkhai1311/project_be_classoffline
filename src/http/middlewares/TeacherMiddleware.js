const model = require("../../models/index");
const Type = model.Type;

module.exports = async (req, res, next) => {
    // Logic lọc request
    const type = await Type.findOne({
        id: req.user.typeId,
    });

    const typeName = type.name;
    // console.log(typeName);
    if (typeName === "Teacher") {
        res.redirect("/teacher");
        return;
    }

    next();
    //Middleware
};
