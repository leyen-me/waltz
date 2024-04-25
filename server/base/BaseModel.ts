import { DataTypes, Model, ModelAttributes, ModelOptions, Sequelize } from "sequelize";
import moment from "moment";

class BaseModel extends Model {
  declare id: number;
  declare createdAt: string;
  declare updatedAt: string;

  toJSON() {
    const json = this.get() as unknown as BaseModel
    json.createdAt = moment(json.createdAt).format('YYYY-MM-DD HH:mm:ss');
    json.updatedAt = moment(json.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    return json;
  }

  //initModel 方法的 options 参数要求包含 sequelize 属性，并且类型为 Sequelize
  static initModel(attributes: ModelAttributes, options: ModelOptions & { sequelize: Sequelize }): typeof BaseModel {
    const modelAttributes: ModelAttributes = {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        comment: "主键id"
      },
      ...attributes,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "创建时间"
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "修改时间"
      }
    };

    return super.init(modelAttributes, options) as typeof BaseModel;
  }
}

export default BaseModel;
