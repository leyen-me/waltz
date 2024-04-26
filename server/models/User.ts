import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize, ModelAttributes, ModelOptions } from "sequelize";
import sequelize from "../db";

export default class User extends BaseModel {
  declare username: string;
  declare password: string;

  static initUser(sequelize: Sequelize): typeof User {
    const modelAttributes: ModelAttributes = {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "姓名/昵称",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "密码",
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "头像",
      },
      gender: {
        type: DataTypes.ENUM("男", "女", "保密"),
        allowNull: true,
        comment: "性别",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "邮箱",
      },
      introduction: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "简介",
      },
      superAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "是否是超级管理员"
      }
    };

    const modelOptions: ModelOptions & { sequelize: Sequelize } = {
      sequelize,
      tableName: 'user',
    };

    const userModel = super.initModel(modelAttributes, modelOptions) as typeof User;
    return userModel;
  }
}

// 初始化模型，调用 initUser 方法
const userModel = User.initUser(sequelize);

(async () => {
  // 每次运行都重新建表
  await userModel.sync({ force: true });

  // // 每次运行都重新新建用户
  const password = "123456";
  // 假设你已经定义了 defineEncodeHash 方法
  const hashedPassword = defineEncodeHash(password);
  await userModel.create({
    username: "LEYEN",
    password: hashedPassword,
    superAdmin: 1
  });
})();
