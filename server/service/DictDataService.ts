import DictData from '@/server/models/DictData';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes, Op } from 'sequelize';

export default class DictDataService extends BaseService<DictData> {
    constructor() {
        super(DictData);
    }

    async selectPage(query: DictDataQuery): Promise<BasePageResponse<DictData>> {
        return this.page(query);
    }

    async createDictData(dictData: CreationAttributes<DictData>): Promise<DictData> {
        return await defineTransactionWrapper(async (transaction) => {
            return await this.create(dictData, { transaction });
        });
    }

    async updateDictData(dictDataId: number, dictData: Partial<CreationAttributes<DictData>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(dictData, { where: { id: dictDataId }, transaction });
        });
    }

    async deleteDictData(dictDataIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: dictDataIds }, transaction });
        });
    }

    async deleteByTypeIds(typeIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await DictData.destroy({ where: { typeId: typeIds }, transaction });
        });
    }

    async getDictDataById(dictDataId: number): Promise<DictData | null> {
        return await DictData.findByPk(dictDataId);
    }

    async getAllDictDataByType(typeId: number): Promise<DictData[]> {
        return await DictData.findAll({ where: { typeId } });
    }

    async getAllDictDataByLabel(label: string): Promise<DictData[]> {
        return await DictData.findAll({ where: { label: { [Op.like]: `%${label}%` } } });
    }
}
