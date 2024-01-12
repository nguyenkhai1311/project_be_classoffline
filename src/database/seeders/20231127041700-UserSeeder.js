"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    name: "Nguyễn Khải",
                    email: "nguyenhuukhai1303@gmail.com",
                    password: bcrypt.hashSync("123456", saltRounds),
                    phone: "012354631",
                    address: "Hà Nội",
                    typeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Sơn Đặng",
                    email: "sondang@gmail.com",
                    password: bcrypt.hashSync("123456", saltRounds),
                    phone: "012354631",
                    address: "Hà Nội",
                    typeId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Hoàng An",
                    email: "hoangan@gmail.com",
                    password: bcrypt.hashSync("123456", saltRounds),
                    phone: "012354631",
                    address: "Hà Nội",
                    typeId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
