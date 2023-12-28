const { body, oneOf } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const User = model.User;

module.exports = () => {
    return [
        body("nameUser", "Tên bắt buộc phải nhập").notEmpty(),
        body("emailUser", "Không được để trống email").notEmpty(),
        body("emailUser").custom(async (value) => {
            const { id } = req.params;
            const user = await User.findOne({
                where: {
                    email: value,
                    id: {
                        [Op.not]: id,
                    },
                },
            });
            console.log(`Tìm kiếm User`, user);
            if (user) {
                throw new Error("Email đã tồn tại");
            }
        }),
        body("emailUser", "Email không hợp lệ").isEmail(),
        body("phoneUser", "Số điện thoại không được để trống").notEmpty(),
        body("phoneUser", "Số điện thoại không hợp lệ")
            .optional()
            .isMobilePhone(),
        body("typeId", "Không được để trống chức vụ").notEmpty(),
    ];
};
