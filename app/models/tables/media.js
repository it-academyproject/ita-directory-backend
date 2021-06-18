const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('media', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mime_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    file_size: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'media',
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
      {
        name: "fk_media_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
