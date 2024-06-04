import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";


export default class SiteConfig extends BaseModel<SiteConfig> {
  declare pid: number;
  declare code: string;
  declare title: string;
  declare value: string;
  declare type: SiteConfigTypeEnum;
  declare dictType: string;
  declare desc: string;
  declare isChange: number;
  declare sort: number;
  declare isShow: number;

  public children?: SiteConfig[];


  toJSON() {
    const json = super.toJSON();
    return json;
  }

  static initSiteConfig(sequelize: Sequelize): typeof SiteConfig {
    const modelAttributes = {
      pid: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: false,
        comment: '父id',
      },
      code: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: false,
        comment: '编码',
      },
      title: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: false,
        comment: '标题',
      },
      value: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: false,
        comment: '值',
      },
      type: {
        type: DataTypes.ENUM({ values: ["string", "boolean", "number", "textarea", "dict"] }),
        allowNull: false,
        comment: '类型'
      },
      dictType: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: true,
        comment: '字典类型',
      },
      desc: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: true,
        comment: '描述'
      },
      isChange: {
        type: DataTypes.TINYINT({ length: 1 }),
        allowNull: true,
        comment: '是否可变'
      },
      sort: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: true,
        comment: '排序',
      },
      isShow: {
        type: DataTypes.TINYINT({ length: 1 }),
        allowNull: true,
        defaultValue: 1,
        comment: '是否展示(前台)'
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