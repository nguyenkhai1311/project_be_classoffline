const model = require("../../models/index");
const Type = model.Type;

module.exports = {
    check: async (req, res, next) => {
        const { typeId } = req.user;
        const type = await Type.findOne({
            where: {
                id: typeId,
            },
        });

        return type.name;
    },
};
