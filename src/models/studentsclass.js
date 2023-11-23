"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StudentsClass extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            StudentsClass.belongsTo(models.User);
            StudentsClass.belongsTo(models.Class);
            StudentsClass.belongsTo(models.LearningStatus);
        }
    }
    StudentsClass.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            studentId: DataTypes.INTEGER,
            statusId: DataTypes.INTEGER,
            classId: DataTypes.INTEGER,
            completeDate: DataTypes.DATE,
            dropDate: DataTypes.DATE,
            recover: DataTypes.DATE,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "StudentsClass",
        }
    );
    return StudentsClass;
};
