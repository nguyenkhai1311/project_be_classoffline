"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CourseModule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CourseModule.belongsTo(models.Course);
            CourseModule.hasMany(models.ModuleDocument);
        }
    }
    CourseModule.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING(200),
            courseId: {
                type: DataTypes.INTEGER,
                references: "Courses",
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "CourseModule",
        }
    );
    return CourseModule;
};
