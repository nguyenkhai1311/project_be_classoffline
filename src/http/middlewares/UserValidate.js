const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const User = model.User;

module.exports = () => {
    return [
        body("name", "Tên bắt buộc phải nhập").notEmpty(),
        body("email", "Không được để trống email").notEmpty(),
        body("email").custom(async (value) => {
            const user = await User.findOne({
                where: {
                    email: value,
                },
            });
            if (user) {
                throw new Error("Email đã tồn tại");
            }
        }),
        body("email", "Email không hợp lệ").isEmail(),
        body("phone", "Số điện thoại không được để trống").notEmpty(),
        body("phone", "Số điện thoại không hợp lệ").optional().isMobilePhone(),
    ];
};
