import Context from "@/server/models/Context";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";

export default class ContextService extends BaseService<Context> {
    constructor() {
        super(Context);
    }

    async selectPage(query: ContextQuery): Promise<BasePageResponse<Context>> {
        return await this.page(query);
    }

    async createContext(contextData: CreationAttributes<Context>): Promise<BaseCreateResponse> {
        const createdContextId = await defineTransactionWrapper(async (transaction) => {
            const createdContext = await this.create(contextData, { transaction });
            return createdContext.id as number;
        });
        return createdContextId;
    }

    async updateContext(contextId: number, contextData: Partial<CreationAttributes<Context>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(contextData, { where: { id: contextId }, transaction });
        });
    }

    async deleteContexts(contextIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: contextIds }, transaction });
        });
    }

    async getContextById(contextId: number): Promise<Context | null> {
        return await Context.findByPk(contextId);
    }

    async getAllContexts(): Promise<Context[]> {
        return Context.findAll();
    }

    async getContextsByChatId(chatId: number): Promise<Context[]> {
        return await Context.findAll({ where: { chatId } });
    }
}
