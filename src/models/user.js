"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Type);
            User.hasOne(models.UserOtp);
            User.hasMany(models.UserColumn);
            User.hasOne(models.LoginToken);
            User.hasMany(models.UserSocial);
            User.belongsToMany(models.Role, { through: "User_Role" });
            User.belongsToMany(models.Permission, {
                through: "User_Permissions",
                foreignKey: "userId",
            });
            User.hasMany(models.Course);
            User.belongsToMany(models.Class, {
                through: "Classes_Teachers",
                foreignKey: "teacherId",
            });
            User.hasMany(models.TeacherCalendar);
            User.hasMany(models.StudentsClass);
            User.hasOne(models.StudentsAttendance);
            User.hasMany(models.ExercisesSubmit);
            User.hasMany(models.Comment);
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING(100),
            email: DataTypes.STRING(100),
            password: DataTypes.STRING(100),
            phone: DataTypes.STRING(15),
            address: DataTypes.STRING(200),
            typeId: DataTypes.INTEGER,
            firstLogin: {
                type: DataTypes.TINYINT(1),
                defaultValue: 0,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
