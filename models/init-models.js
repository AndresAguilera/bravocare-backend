var DataTypes = require("sequelize").DataTypes;
var _facilities = require("./facilities");
var _jobs = require("./jobs");
var _nurse_hired_jobs = require("./nurse_hired_jobs");
var _nurses = require("./nurses");
var _question_one_shifts = require("./question_one_shifts");

function initModels(sequelize) {
  var facilities = _facilities(sequelize, DataTypes);
  var jobs = _jobs(sequelize, DataTypes);
  var nurse_hired_jobs = _nurse_hired_jobs(sequelize, DataTypes);
  var nurses = _nurses(sequelize, DataTypes);
  var question_one_shifts = _question_one_shifts(sequelize, DataTypes);


  return {
    facilities,
    jobs,
    nurse_hired_jobs,
    nurses,
    question_one_shifts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
