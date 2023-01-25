const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facilities', {
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    facility_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'facilities',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "facilities_pkey",
        unique: true,
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
};
