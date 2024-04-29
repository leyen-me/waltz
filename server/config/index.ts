import { Options } from "sequelize";
export const secretKey = "ijdioshai";

export const whiteList = ["/api/admin/auth/**", "/api/admin/article/**", "/api/admin/attachment/**"];

export const isForce = false;

export const baseUploadDir = './public'; // 从某个地方获取上传目录

export const dbConfig: Options = {
  host: "localhost",
  username: "root",
  password: "JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA=",
  database: "open-nuxt-blog",
  dialect: "mysql",
  ssl: false,
  timezone: "+08:00",
  define: {
    underscored: true,
    freezeTableName: false,
    charset: "utf8mb4",
    tableName: "t_"
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
};
