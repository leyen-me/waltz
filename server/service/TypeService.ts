import Type from "@/server/models/Type";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes, FindAndCountOptions, Op } from "sequelize";

export default class TypeService extends BaseService<Type> {
    constructor() {
        super(Type);
    }

    async selectPage(query: TypeQuery): Promise<BasePageResponse<Type>> {
        const { userId, page = 1, limit = 10, asc = true } = query;

        const offset = (Number(page) - 1) * Number(limit);

        const condition = {
            [Op.or]: [{ userId }, { userId: null }]
        };

        // Initialize the main query options
        const mainQueryOptions: FindAndCountOptions = {
            offset,
            limit: Number(limit),
            order: [["createdAt", asc ? "ASC" : "DESC"]],
            where: condition,
        };

        const { rows, count } = await Type.findAndCountAll(mainQueryOptions);

        const totalPages = Math.ceil(count / Number(limit));

        return {
            data: rows,
            meta: {
                totalPages,
                currentPage: Number(page),
                pageSize: Number(limit),
                totalItems: count,
            },
        };
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
        return await Type.findAll();
    }
}
