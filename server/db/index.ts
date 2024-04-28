import { Sequelize } from "sequelize";
import { dbConfig } from "../config";

const sequelize = new Sequelize(dbConfig);

//在定义模型之前，使用 beforeDefine 钩子函数添加统一的表前缀
sequelize.beforeDefine((attributes, options) => {
    // 添加统一的表前缀
    options.tableName = dbConfig.define?.tableName as string + options.tableName;
});

export default sequelize;