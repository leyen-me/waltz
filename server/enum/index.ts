import { DataTypes } from "sequelize";

export const ArticleStatus = DataTypes.ENUM("draft", "published", "archived")

export const SiteConfigTypes = DataTypes.ENUM("string", "boolean", "number")