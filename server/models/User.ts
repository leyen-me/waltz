import BaseModel from "./BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./index";
import bcrypt from "bcrypt";

export default class User extends BaseModel {
  declare username: string;
  declare password: string;
}

User.init(
  {
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
  { sequelize }
);

(async () => {
  await User.sync({ force: true });
  const salt = bcrypt.genSaltSync(10);
  const password = "123456";
  const hashedPassword = bcrypt.hashSync(password, salt);
  await User.create({
    username: "LEYEN",
    password: hashedPassword,
  });
})();
