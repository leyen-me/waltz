import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";


export default class SiteConfig extends BaseModel<SiteConfig> {
  declare key: string;
  declare value: string;
  declare type: "string" | "boolean" | "number";


  static initSiteConfig(sequelize: Sequelize): typeof SiteConfig {
    const modelAttributes = {
      key: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: false,
        comment: '键',
      },
      value: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: false,
        comment: '值',
      },
      type: {
        type: DataTypes.ENUM({ values: ["string", "boolean", "number"] }),
        allowNull: false,
        comment: '类型'
      },
      desc: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: true,
        comment: '描述'
      }
    };

    const modelOptions = {
      sequelize,
      tableName: 'site_config',
    };

    return super.initModel(modelAttributes, modelOptions) as typeof SiteConfig;
  }
}

// 初始化模型，调用 initSiteConfig 方法
export const siteConfigModel = SiteConfig.initSiteConfig(sequelize) as typeof SiteConfig;