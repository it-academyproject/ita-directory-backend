const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conversation', {
    user_id_one: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    user_id_two: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'conversation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id_one" },
          { name: "user_id_two" },
        ]
      },
      {
        name: "fk_conversation_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id_one" },
        ]
      },
      {
        name: "fk_conversation_user2_idx",
        using: "BTREE",
        fields: [
          { name: "user_id_two" },
        ]
      },
    ]
  });
};
