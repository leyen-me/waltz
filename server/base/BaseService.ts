import { Attributes, CreateOptions, CreationAttributes, DestroyOptions, FindAndCountOptions, ModelStatic, UpdateOptions, Transaction, where } from 'sequelize';
import BaseModel from './BaseModel';

export default class BaseService<T extends BaseModel<T>> {

    private model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async page<Q extends BaseQuery>(query: Q): Promise<BasePageResponse<T>> {
        let { page = 1, limit = 10, order, asc, ...items } = query;
        page = Number(page);
        limit = Number(limit);

        const offset = (page - 1) * limit;

        // 构建查询条件
        const options: FindAndCountOptions = {
            offset,
            limit,
            order: this.getOrderCriteria(order, asc),
            where: items
        };

        const { rows, count } = await this.model.findAndCountAll(options);

        const totalPages = Math.ceil(count / limit);

        return {
            data: rows,
            meta: {
                totalPages,
                currentPage: page,
                pageSize: limit,
                totalItems: count,
            },
        };
    }

    async create(
        values?: CreationAttributes<T>,
        options?: CreateOptions<Attributes<T>>,
        transaction?: Transaction
    ): Promise<T> {
        return await this.model.create(values, { ...options, transaction });
    }

    async update(
        values: Partial<CreationAttributes<T>>,
        options: UpdateOptions<Attributes<T>>,
        transaction?: Transaction
    ): Promise<number> {
        const [affectedCount] = await this.model.update(values, { ...options, transaction });
        return affectedCount;
    }

    async delete(options: DestroyOptions, transaction?: Transaction): Promise<number> {
        const deletedCount = await this.model.destroy({ ...options, transaction });
        return deletedCount;
    }

    private getOrderCriteria(order?: string, asc: boolean = true): [string, 'ASC' | 'DESC'][] {
        if (!order) return [];
        return [[order, asc ? 'ASC' : 'DESC']];
    }
}