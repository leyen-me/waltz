import Menu from '@/server/models/Menu';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes, Op } from 'sequelize';
import User from '../models/User';
import RoleMenu from '../models/RoleMenu';

export default class MenuService extends BaseService<Menu> {
    constructor() {
        super(Menu);
    }

    async selectPage(query: MenuQuery): Promise<BasePageResponse<Menu>> {
        return this.page(query);
    }

    async createMenu(menuData: CreationAttributes<Menu>): Promise<{ message: string }> {
        const createdMenu = await this.create(menuData);
        if (createdMenu) {
            return { message: 'Menu created successfully' };
        }
        throw Error("Failed to create menu");
    }

    async updateMenu(menuId: number, menuData: Partial<CreationAttributes<Menu>>): Promise<{ message: string }> {
        const options = { where: { id: menuId } };
        const affectedRows = await this.update(menuData, options);
        if (affectedRows > 0) {
            return { message: 'Menu updated successfully' };
        }
        throw Error("Failed to update menu")
    }

    async deleteMenus(menuIds: number[]): Promise<{ message: string }> {
        const options = { where: { id: menuIds } };
        const deletedCount = await this.delete(options);
        if (deletedCount > 0) {
            return { message: 'Menus deleted successfully' };
        }
        throw Error("Failed to delete menus");
    }

    async getMenuById(menuId: number | string): Promise<Menu | null> {
        return await Menu.findByPk(menuId);
    }

    async getAllMenus(user: User): Promise<Menu[]> {
        if (user.get("superAdmin") === 0) {
            return (await Menu.findAll()).map((item) => {
                return item.toJSON() as Menu;
            });
        } else {
            // 构建查询条件对象
            const whereCondition = {
                userId: user.id,
                type: "菜单"
            };

            // 执行查询
            const result = await Menu.findAll({
                include: [{
                    model: RoleMenu,
                    required: true,
                    attributes: [],
                    where: {
                        roleId: { [Op.col]: 't_user_role.role_id' }
                    }
                }],
                where: whereCondition,
                order: [['sort', 'ASC']]
            });

            // 处理查询结果并返回菜单数组
            return result.map((row: any) => new Menu(row) as Menu);
        }
    }



    async getUserAuthority(user: User): Promise<string[]> {
        let whereCondition: any = {};

        if (user.get("superAdmin") !== 0) {
            whereCondition.userId = user.get("id");
        }

        // 构建查询条件
        const includeCondition = [{
            model: RoleMenu,
            required: true,
            attributes: [],
            where: {
                roleId: { [Op.col]: 't_user_role.role_id' }
            }
        }];

        // 执行查询
        const result = await Menu.findAll({
            include: includeCondition,
            where: whereCondition,
            order: [['sort', 'ASC']]
        });

        // 提取查询结果中的权限字符串并返回
        const authorityList: string[] = result.map((menu: any) => menu.authority);

        return authorityList;
    }
}
