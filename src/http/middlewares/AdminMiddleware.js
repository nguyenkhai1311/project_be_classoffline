const model = require("../../models/index");
const Type = model.Type;

module.exports = async (req, res, next) => {
    // Logic lọc request
    console.log(req.user.typeId);
    const type = await Type.findOne({
        where: {
            id: req.user.typeId,
        },
    });
    console.log(type);
    const typeName = type.name;
    console.log(typeName);
    if (typeName === "Admin") {
        res.redirect("/admin");
        return;
    }

    next();
    //Middleware
};
