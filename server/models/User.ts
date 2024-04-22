import BaseModel from "./BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./index";

export default class User extends BaseModel {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize }
);
