const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nurse_hired_jobs', {
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nurse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'nurse_hired_jobs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "nurse_hired_jobs_pkey",
        unique: true,
        fields: [
          { name: "job_id" },
          { name: "nurse_id" },
        ]
      },
    ]
  });
};
