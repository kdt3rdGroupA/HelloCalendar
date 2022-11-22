const Todo = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "todo",
    {
      id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      key_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text : {
        type: DataTypes.STRING(50)
      },
      priority : {
        type: DataTypes.STRING(10)
      },
      deadline: {
        type: DataTypes.STRING(20)
      }
    }, {
      indexes: [{
        name: "key_id",
        using: 'BTREE'
      }]
    }
  );
  return model;
};

module.exports = Todo;