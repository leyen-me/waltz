import { Options } from "sequelize";

const { NUXT_DB_HOST, NUXT_DB_DATABASE, NUXT_DB_USERNAME, NUXT_DB_PASSWORD } =
  useRuntimeConfig().public;

export const secretKey = "ijdioshai";

export const whiteList = ["/api/admin/auth/**"];

export const dbConfig: Options = {
  host: NUXT_DB_HOST,
  username: NUXT_DB_USERNAME,
  password: NUXT_DB_PASSWORD,
  database: NUXT_DB_DATABASE,
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
