import Menu from '@/server/models/Menu';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes, Op } from 'sequelize';
import User from '../models/User';
import RoleMenu from '../models/RoleMenu';
import UserRoleService from './UserRoleService';
import sequelize from '../db';


export default class MenuService extends BaseService<Menu> {
    private userRoleService = new UserRoleService();

    constructor() {
        super(Menu);
    }

    async selectPage(query: MenuQuery): Promise<BasePageResponse<Menu>> {
        return this.page(query);
    }

    async createMenu(menuData: CreationAttributes<Menu>): Promise<BaseCreateResponse> {
        return (await this.create(menuData)).id as number;
    }

    async updateMenu(menuId: number, menuData: Partial<CreationAttributes<Menu>>): Promise<void> {
        await this.update(menuData, { where: { id: menuId } });
    }

    async deleteMenus(menuIds: number[]): Promise<void> {
        const deletedCount = await this.delete({ where: { id: menuIds } });
    }

    async getMenuById(menuId: number | string): Promise<Menu | null> {
        return await Menu.findByPk(menuId);
    }

    async getAllMenus(user: User): Promise<Menu[]> {
        if (user.get("superAdmin") === 0) {
            return await Menu.findAll();
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

            return result;
        }
    }



    async getUserAuthority(user: User): Promise<string[]> {

        if (user.superAdmin !== 0) {
            // 如果用户是超级管理员，直接返回所有菜单权限
            const allMenus = await Menu.findAll();
            return allMenus.map(menu => menu.authority);
        }

        // 如果用户不是超级管理员，则根据用户的角色信息获取菜单权限
        // 获取用户的角色信息，假设从数据库中查询
        const roleIdList = await this.userRoleService.getRoleIdList(user.id as number);

        // 构建 SQL 查询语句
        const query = `
            SELECT DISTINCT m.authority,m.sort AS sort_order
            FROM t_menu m
            INNER JOIN t_role_menu rm ON m.id = rm.menu_id
            WHERE rm.role_id IN (${roleIdList.join(',')})
            ORDER BY sort_order ASC;
        `;
        const [results] = await sequelize.query(query);
        return results.map((row: any) => row.authority);
    }
}
