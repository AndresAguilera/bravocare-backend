const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.shifts = require("./question_one_shifts.js")(sequelize, Sequelize);
db.facilities = require("./facilities.js")(sequelize, Sequelize);
db.nurses = require("./nurses")(sequelize, Sequelize);
db.jobs = require("./jobs")(sequelize, Sequelize);
db.nurseHiredJobs = require("./nurse_hired_jobs")(sequelize, Sequelize);

db.facilities.hasMany(db.shifts, {foreignKey: 'facility_id'})
db.shifts.belongsTo(db.facilities, {foreignKey: 'facility_id'})


module.exports = db;
