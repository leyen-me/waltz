import Tag from "@/server/models/Tag";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";
import sequelize from "../db";

export default class TagService extends BaseService<Tag> {
    constructor() {
        super(Tag);
    }

    async selectPage(query: TagQuery): Promise<BasePageResponse<Tag>> {
        return await this.page(query);
    }

    async createTag(tagData: CreationAttributes<Tag>): Promise<BaseCreateResponse> {
        const createdTagId = await defineTransactionWrapper(async (transaction) => {
            const createdTag = await this.create(tagData, { transaction });
            return createdTag.id as number;
        });
        return createdTagId;
    }

    async updateTag(tagId: number, tagData: Partial<CreationAttributes<Tag>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(tagData, { where: { id: tagId }, transaction });
        });
    }

    async deleteTags(tagIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: tagIds }, transaction });
        });
    }

    async getTagById(tagId: number): Promise<Tag | null> {
        const query = `
            SELECT t.*
            FROM t_tag t
            WHERE t.id = :tagId
        `;

        const result = await sequelize.query(query, {
            replacements: { tagId },
            model: Tag,
            mapToModel: true
        });

        return result.length ? result[0] : null;
    }

    async getAllTags(): Promise<Tag[]> {
        return Tag.findAll();
    }
}
