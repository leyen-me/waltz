import { Options } from "sequelize";

export const secretKey = "ijdioshai";

export const whiteList = ["/api/admin/auth/**"];

export const dbConfig: Options = {
  host: "localhost",
  username: "root",
  password: "JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA=",
  database: "open_nuxt_blog",
  dialect: "mysql",
  ssl: false,
  timezone: "+08:00",
  define: {
    underscored: true,
    freezeTableName: false,
    charset: "utf8mb4",
    tableName: "t_",
    collate: "utf8mb4_general_ci",
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
};
