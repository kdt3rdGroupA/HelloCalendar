// 유저의 로그인정보 테이블("user_login_key")접근
const Login = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "user_login_key",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      hash_pw: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      tableName: "user_login_key",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return model;
};

module.exports = Login;
