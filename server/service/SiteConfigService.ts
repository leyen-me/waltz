import SiteConfig from '@/server/models/SiteConfig';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes, Op, Order } from 'sequelize';
import { getAllSiteConfigs } from '../utils/siteConfigUtil';

export default class SiteConfigService extends BaseService<SiteConfig> {
    constructor() {
        super(SiteConfig);
    }

    async selectPage(query: SiteConfigQuery): Promise<BasePageResponse<SiteConfig>> {
        return this.page(query);
    }

    async createSiteConfig(configData: CreationAttributes<SiteConfig>): Promise<SiteConfig> {
        return await defineTransactionWrapper(async (transaction) => {
            return await this.create(configData, { transaction });
        });
    }

    async updateSiteConfig(configId: number, configData: Partial<CreationAttributes<SiteConfig>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(configData, { where: { id: configId }, transaction });
        });
        // 强制更新缓存
        await getAllSiteConfigs({ update:true })
    }

    async deleteSiteConfig(configIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: configIds }, transaction });
        });
    }

    async getSiteConfigById(configId: number): Promise<SiteConfig | null> {
        return await SiteConfig.findByPk(configId);
    }

    async getAllSiteConfigs(key?: string, asc: boolean = true, isShow?: number): Promise<SiteConfig[]> {
        const whereClause: any = {};

        // 检索
        if (key) {
            whereClause.key = { [Op.like]: `%${key}%` };
        }
        
        // 防止密码泄露
        if (isShow) {
            whereClause.isShow = isShow;
        }

        const orderClause: Order = [['sort', asc ? 'ASC' : 'DESC']];

        // 构建查询条件
        const options = {
            where: whereClause,
            order: orderClause
        };

        return await SiteConfig.findAll(options).then((siteConfigs: SiteConfig[]) => {
            return siteConfigs.map((item) => item.toJSON())
        });
    }
}
