'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeacherCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeacherCalendar.init({
    scheduleDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TeacherCalendar',
  });
  return TeacherCalendar;
};