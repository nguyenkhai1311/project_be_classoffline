'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentsAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentsAttendance.init({
    dateLearn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'StudentsAttendance',
  });
  return StudentsAttendance;
};