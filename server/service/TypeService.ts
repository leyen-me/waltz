import Type from "@/server/models/Type";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";

export default class TypeService extends BaseService<Type> {
    constructor() {
        super(Type);
    }

    async selectPage(query: TypeQuery): Promise<BasePageResponse<Type>> {
        return await this.page(query);
    }

    async createType(typeData: CreationAttributes<Type>): Promise<BaseCreateResponse> {
        const createdTypeId = await defineTransactionWrapper(async (transaction) => {
            const createdType = await this.create(typeData, { transaction });
            return createdType.id as number;
        });
        return createdTypeId;
    }

    async updateType(typeId: number, typeData: Partial<CreationAttributes<Type>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(typeData, { where: { id: typeId }, transaction });
        });
    }

    async deleteTypes(typeIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: typeIds }, transaction });
        });
    }

    async getTypeById(typeId: number): Promise<Type | null> {
        return await Type.findByPk(typeId);
    }

    async getTypeByCode(code: string): Promise<Type | null> {
        return await Type.findOne({
            where: {
                code
            }
        });
    }

    async getAllTypes(): Promise<Type[]> {
        return Type.findAll();
    }
}
