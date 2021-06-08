const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_status', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    pending: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    suspended: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user_status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
