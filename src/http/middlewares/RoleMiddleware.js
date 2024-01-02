const model = require("../../models/index");
const Type = model.Type;

module.exports = {
    check: async (req, res, next) => {
        const type = await Type.findOne({
            where: {
                id: req.user.typeId,
            },
        });

        return type.name;
    },
};
