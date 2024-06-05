import Chat from "@/server/models/Chat";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";
import useFetchStream from "@/utils/useFetchStream";
import ContextService from "./ContextService";
import TypeService from "./TypeService";
import SiteConfigService from "./SiteConfigService";
import { buildMap, getValue } from "@/common/utils/siteConfigUtil";
import { CONFIG_KEY } from "@/common/constants";


export default class ChatService extends BaseService<Chat> {
    private contextService = new ContextService();
    private typeService = new TypeService();
    private siteConfigService = new SiteConfigService();

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

    async deleteChats(chatIds: number[], userId: number): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: chatIds, userId: userId }, transaction });
        });
    }

    async deleteAllChat(userId: number): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            const chatIdList = await this.getChatIdByUserId(userId);
            await Chat.destroy({
                where: {
                    userId: userId
                }, transaction
            });
            this.contextService.deleteContextsByChatIds(chatIdList);
        });
    }

    async getChatById(chatId: number): Promise<Chat | null> {
        return await Chat.findByPk(chatId);
    }

    async getChatIdByUserId(userId: number): Promise<number[]> {
        const chats = await Chat.findAll({
            where: { userId },
            attributes: ['id']
        });
        return chats.map(chat => chat.getDataValue('id'));
    }

    async getAllChats(): Promise<Chat[]> {
        return Chat.findAll({
            order: [
                ['created_at', 'DESC']
            ]
        });
    }

    async getReStream(chatId: number, prompt: string): Promise<ReadableStream> {
        await this.contextService.deleteLastContextByChatId(chatId);
        return await this.getStream(chatId);
    }


    async getStream(chatId: number, prompt?: string): Promise<ReadableStream> {
        if (prompt) {
            await this.contextService.createContext({ chatId, content: prompt, role: "user", status: 1 });
        }
        const chat = await this.getChatById(chatId);

        const messages: any = [];
        const contexts = await this.contextService.getContextsByChatId(chatId);


        const type = await this.typeService.getTypeByCode(chat!.typeCode);
        if (type!.systemPrompt) {
            messages.push({
                role: "system",
                content: type!.systemPrompt
            });
        }

        contexts.map((item) => {
            messages.push({
                role: item.role,
                content: item.content
            })
        })

        const success = (answer: string, executionTime: number) => {
            this.contextService.createContext({ chatId, content: answer, role: "assistant", status: 1, executionTime });
        }

        const siteConfigs = await this.siteConfigService.getAllSiteConfigs();
        const map = buildMap(siteConfigs);

        const stream = await useFetchStream({
            url: getValue(map, CONFIG_KEY.CHATGPT.URL),
            authorization: `Bearer ${getValue(map, CONFIG_KEY.CHATGPT.KEY)}`,
            body: {
                model: getValue(map, CONFIG_KEY.CHATGPT.MODEL),
                messages,
            },
            stream: true,
            success
        });
        if (!stream) {
            throw new Error("获取 stream 失败");
        }
        return stream;
    }

    async resume(chatId: number): Promise<void> {
        const contexts = await this.contextService.getContextsByChatId(chatId);
        const siteConfigs = await this.siteConfigService.getAllSiteConfigs();
        const map = buildMap(siteConfigs);


        const messages: any = [];
        contexts.map((item) => {
            messages.push({
                role: item.role,
                content: item.content,
            })
        })

        messages.push({
            role: "user",
            content: "请使用中文给上述对话起一个10个字以内的标题, 不要任何注释"
        });

        const chat = await this.getChatById(chatId);

        const success = async (answer: string, executionTime: number) => {
            if (chat) {
                const sanitizedAnswer = answer.match(/[^"]+/g)?.join('') || '';
                await this.updateChat(chatId, { title: sanitizedAnswer });
            }
        }

        await useFetchStream({
            url: getValue(map, CONFIG_KEY.CHATGPT.URL),
            authorization: `Bearer ${getValue(map, CONFIG_KEY.CHATGPT.KEY)}`,
            body: {
                model: getValue(map, CONFIG_KEY.CHATGPT.MODEL),
                messages,
            },
            stream: false,
            success
        });
    }
}
