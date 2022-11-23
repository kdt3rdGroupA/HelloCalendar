
const Calendar = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "calendar",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      key_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING(200),
      },
      startDate: {
        type: DataTypes.STRING(20)
      },
      endDate: {
        type: DataTypes.STRING(20)
      }
    }, {
      tableName: 'calendar',
      freezeTableName: true,
      timestamps: false,
      index: [{
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

module.exports = Calendar;