import Menu from '@/server/models/Menu';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes, Op, QueryTypes } from 'sequelize';
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
        if (user.get("superAdmin") === 1) {
            // 如果用户是超级管理员，直接返回所有菜单  
            return Menu.findAll().then((menus: Menu[]) => {
                return menus.map((item)=>item.toJSON())
            });
        } else {
            // 构建 SQL 查询语句  
            const query = `  
                SELECT m.*  
                FROM t_menu m  
                JOIN t_role_menu rm ON m.id = rm.menu_id  
                JOIN t_user_role ur ON rm.role_id = ur.role_id  
                WHERE ur.user_id = :userId AND m.type = 'menu'  
                ORDER BY m.sort ASC;  
            `;

            // 使用参数绑定来避免 SQL 注入  
            const replacements = { userId: user.id };

            // 执行原生 SQL 查询  
            const [results] = await sequelize.query(query, {
                replacements
            });

            return results as Menu[]
        }
    }



    async getUserAuthority(user: User): Promise<string[]> {

        if (user.superAdmin === 1) {
            // 如果用户是超级管理员，直接返回所有菜单权限
            const allMenus = await Menu.findAll();
            return allMenus.map(menu => menu.authority);
        }

        // 如果用户不是超级管理员，则根据用户的角色信息获取菜单权限
        // 获取用户的角色信息，假设从数据库中查询
        const roleIdList = await this.userRoleService.getRoleIdList(user.id as number);

        // 构建 SQL 查询语句
        const query = `  
            SELECT DISTINCT m.authority  
            FROM t_menu m  
            INNER JOIN t_role_menu rm ON m.id = rm.menu_id  
            WHERE rm.role_id IN (:roleIds);  
        `;

        // 使用参数绑定来避免 SQL 注入  
        // Sequelize 会自动处理数组中的值，用于 IN 查询  
        const [results] = await sequelize.query(query, {
            replacements: { roleIds: roleIdList }
        });

        return results.map((row: any) => row.authority);
    }
}
