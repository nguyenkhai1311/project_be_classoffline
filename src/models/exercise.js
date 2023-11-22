"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Exercise.belongsTo(models.Class);
            Exercise.hasMany(models.ExercisesSubmit);
        }
    }
    Exercise.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            classId: DataTypes.INTEGER,
            title: DataTypes.STRING(200),
            content: DataTypes.TEXT,
            attachment: DataTypes.STRING(200),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Exercise",
        }
    );
    return Exercise;
};
