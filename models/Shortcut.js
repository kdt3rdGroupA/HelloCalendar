const Shortcut = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "shortcut",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      key_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      link: {
        type: DataTypes.STRING(200),        
        allowNull: false
      }
    },
    {
      tableName: "shortcut",
      freezeTableName: true,
      timestamps: false,
      indexes: [{
        name: 'key_id',
        using: 'BTREE',
        fields: [{
          name: 'key_id',
          collate: 'utf8_general_ci',
          order: 'DESC'
        }]
      }]
    }
  );
  return model;
};

module.exports = Shortcut;