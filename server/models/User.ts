import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class User extends BaseModel {
  declare username: string;
  declare password: string;
}

User.init(
  {
    // id: {
    //   type: DataTypes.BIGINT,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "姓名/昵称",
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "密码",
    },
  },
  {
    sequelize,
    tableName: 'user',
  }
);

(async () => {
  // 每次运行都重新建表
  await User.sync({ force: true });

  // 每次运行都重新新建用户
  const password = "123456";
  const hashedPassword = defineEncodeHash(password);
  await User.create({
    username: "LEYEN",
    password: hashedPassword,
  });
})();
