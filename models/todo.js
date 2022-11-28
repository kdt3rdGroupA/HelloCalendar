const Todo = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "todo",
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
      task: {
        type: DataTypes.STRING(50),
      },
      priority: {
        type: DataTypes.STRING(10),
      },
      // deadline: {
      //   type: DataTypes.STRING(20),
      // },
    },
    {
      tableName: "todo",
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          name: "key_id",
          using: "BTREE",
          fields: [
            {
              name: "key_id",
              collate: "utf8_general_ci",
              order: "DESC",
            },
          ],
        },
      ],
    }
  );
  return model;
};

module.exports = Todo;
