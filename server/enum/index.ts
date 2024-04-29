
import { DataTypes } from "sequelize";

export const ArticleStatus = DataTypes.ENUM("draft", "published", "archived")