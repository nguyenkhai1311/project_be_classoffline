"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class.belongsTo(models.Course);
            Class.belongsToMany(models.User, {
                through: "Classes_Teachers",
                foreignKey: "classId",
            });
            Class.hasMany(models.TeacherCalendar);
            Class.hasMany(models.StudentsClass);
            Class.hasMany(models.StudentsAttendance);
            Class.hasMany(models.Exercise);
            Class.hasMany(models.Comment);
        }
    }
    Class.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(200),
                unique: true,
            },
            quantity: DataTypes.INTEGER,
            startDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
            schedule: DataTypes.INTEGER(1),
            timeLearn: DataTypes.STRING(50),
            courseId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Class",
        }
    );
    return Class;
};
