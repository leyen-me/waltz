import { Options } from "sequelize";

const runtimeConfig = useRuntimeConfig();

export const secretKey = "ijdioshai";

export const whiteList = ["/api/admin/auth/**"];

// 强制初始化数据库:清库有风险 使用需谨慎 强制不规范 亲人两行泪
export const isForce = true;

// 开发环境和生产环境目录不一致
export const baseUploadDir =
  runtimeConfig.public.NUXT_ENV === "development" ? "./public" : "../public";

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
    tableName: "t_",
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
};
