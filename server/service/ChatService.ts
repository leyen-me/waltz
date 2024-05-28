import Chat from "@/server/models/Chat";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";

export default class ChatService extends BaseService<Chat> {
    constructor() {
        super(Chat);
    }

    async selectPage(query: ChatQuery): Promise<BasePageResponse<Chat>> {
        return await this.page(query);
    }

    async createChat(chatData: CreationAttributes<Chat>): Promise<BaseCreateResponse> {
        const createdChatId = await defineTransactionWrapper(async (transaction) => {
            const createdChat = await this.create(chatData, { transaction });
            return createdChat.id as number;
        });
        return createdChatId;
    }

    async updateChat(chatId: number, chatData: Partial<CreationAttributes<Chat>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(chatData, { where: { id: chatId }, transaction });
        });
    }

    async deleteChats(chatIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: chatIds }, transaction });
        });
    }

    async getChatById(chatId: number): Promise<Chat | null> {
        return await Chat.findByPk(chatId);
    }

    async getAllChats(): Promise<Chat[]> {
        return Chat.findAll();
    }
}
