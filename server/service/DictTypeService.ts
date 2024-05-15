import DictType from '@/server/models/DictType';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes, Op } from 'sequelize';
import DictData from '../models/DictData';

export default class DictTypeService extends BaseService<DictType> {
    constructor() {
        super(DictType);
    }

    async selectPage(query: DictTypeQuery): Promise<BasePageResponse<DictType>> {
        return this.page(query);
    }

    async createDictType(dictTypeData: CreationAttributes<DictType>): Promise<DictType> {
        return await defineTransactionWrapper(async (transaction) => {
            return await this.create(dictTypeData, { transaction });
        });
    }

    async updateDictType(dictTypeId: number, dictTypeData: Partial<CreationAttributes<DictType>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(dictTypeData, { where: { id: dictTypeId }, transaction });
        });
    }

    async deleteDictType(dictTypeIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: dictTypeIds }, transaction });
        });
    }

    async getDictTypeById(dictTypeId: number | string): Promise<DictType | null> {
        return await DictType.findByPk(dictTypeId);
    }

    async getDictList(): Promise<DictType[]> {
        // 获取全部字典类型列表
        const typeList = await DictType.findAll();

        // 获取全部字典数据列表
        const dataList = await DictData.findAll({ order: [['sort', 'ASC']] });

        // 构造字典列表
        const dictList: DictType[] = [];
        typeList.forEach((type) => {
            const dict = DictType.build({ // 使用 build 方法创建 Sequelize 模型对象
                dictType: type.dictType,
                dictName: type.dictName,
                remark: type.remark,
                sort: type.sort,
                dataList: [],
            });
            dataList.forEach((data) => {
                if (type.id === data.typeId) {
                    dict.dataList.push({
                        dictLabel: data.label,
                        dictValue: data.value,
                        labelClass: data.labelClass,
                    });
                }
            });
            dictList.push(dict);
        });

        return dictList;
    }
}
