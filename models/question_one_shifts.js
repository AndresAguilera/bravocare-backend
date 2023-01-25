const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question_one_shifts', {
    shift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    shift_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'question_one_shifts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "question_one_shifts_pkey",
        unique: true,
        fields: [
          { name: "shift_id" },
        ]
      },
    ]
  });
};
