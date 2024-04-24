import { DataTypes, Model } from "sequelize";

class BaseModel extends Model {
  declare id: number;
  declare createdAt: any;
  declare updatedAt: any;

  toJSON() {
    const json = this.get();
    json.createdAt = json.createdAt.toLocaleString();
    json.updatedAt = json.updatedAt.toLocaleString();
    return json;
  }
}



export default BaseModel;
