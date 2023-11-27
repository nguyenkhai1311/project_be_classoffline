"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Types", [
            {
                name: "Admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Giảng viên",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Học Viên",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Types", null, {});
    },
};
