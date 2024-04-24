import { Model } from "sequelize";
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
}



export default BaseModel;
