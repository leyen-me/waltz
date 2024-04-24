import { Options } from "sequelize";

export const secretKey = "ijdioshai";

export const whiteList = ["/api/admin/auth/**"];

export const dbConfig: Options = {
  host: "localhost",
  username: "root",
  password: "pdBGKGjRyX3Jb2Hn",
  database: "open-nuxt-blog-mysql",
  dialect: "mysql",
  ssl: false,
  timezone: "+08:00",
  define: {
    underscored: true,
    charset: "utf8",
    
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
