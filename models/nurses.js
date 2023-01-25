const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nurses', {
    nurse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nurse_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nurse_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nurses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "nurses_pkey",
        unique: true,
        fields: [
          { name: "nurse_id" },
        ]
      },
    ]
  });
};
