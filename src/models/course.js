"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course.belongsTo(models.User);
            Course.hasMany(models.CourseModule);
            Course.hasOne(models.Class);
        }
    }
    Course.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING(200),
            price: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            teacherId: DataTypes.INTEGER,
            tryLearn: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0,
            },
            quantity: DataTypes.INTEGER,
            duration: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Course",
        }
    );
    return Course;
};
