"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Permission.belongsToMany(models.User, {
                through: "User_Permissions",
                foreignKey: "permissionId",
            });
            Permission.belongsToMany(models.Role, {
                through: "Role_Permission",
                foreignKey: "permissionId",
            });
        }
    }
    Permission.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            values: DataTypes.STRING(150),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Permission",
        }
    );
    return Permission;
};
