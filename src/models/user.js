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
            User.hasOne(models.UserOtp);
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
            firstLogin: DataTypes.BOOLEAN,
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
