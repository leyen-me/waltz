import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(
  "open-nuxt-blog-mysql",
  "root",
  "pdBGKGjRyX3Jb2Hn",
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
    },
  }
);

// @ts-ignore
sequelize.options.define = {
  // 表名，字段使用下划线风格
  underscored: true,
};

// 同步模型
sequelize.sync({ force: true });

export default sequelize;
