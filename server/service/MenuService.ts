import Menu from '@/server/models/Menu';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';
import User from '../models/User';
import UserRoleService from './UserRoleService';
import sequelize from '../db';
import RoleMenuService from './RoleMenuService';


export default class MenuService extends BaseService<Menu> {
    private userRoleService = new UserRoleService();
    private roleMenuService = new RoleMenuService();

    constructor() {
        super(Menu);
    }

    async selectPage(query: MenuQuery): Promise<BasePageResponse<Menu>> {
        query.order = 'sort';
        return this.page(query);
    }

    async createMenu(menuData: CreationAttributes<Menu>): Promise<BaseCreateResponse> {
        return await defineTransactionWrapper(async (transaction) => {
            return (await this.create(menuData, { transaction })).id as number;
        });
    }

    async updateMenu(menuId: number, menuData: Partial<CreationAttributes<Menu>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(menuData, { where: { id: menuId }, transaction });
        });
    }

    async deleteMenu(menuId: number): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: menuId }, transaction });
            await this.roleMenuService.deleteByMenuId(menuId);
        });
    }

    async getMenuById(menuId: number): Promise<Menu | null> {
        return await Menu.findByPk(menuId);
    }


    async getNav(user: User, type: string | null): Promise<Menu[]> {
        let query = `
            SELECT 
                m.id,
                m.pid,
                m.path,
                m.title,
                m.icon,
                m.type,
                m.open_style AS openStyle,
                m.authority,
                m.sort,
                DATE_FORMAT(m.created_at, '%Y-%m-%d %H:%i:%S') AS createdAt,
                DATE_FORMAT(m.updated_at, '%Y-%m-%d %H:%i:%S') AS updatedAt
            FROM t_menu m
            LEFT JOIN t_site_config sc ON m.id = sc.menu_id`;
    
        const replacements: { [key: string]: any } = {};
    
        if (user.get("superAdmin") !== 1) {
            query += `
                JOIN t_role_menu rm ON m.id = rm.menu_id
                JOIN t_user_role ur ON rm.role_id = ur.role_id
                WHERE ur.user_id = :userId`;
            replacements.userId = user.id;
        } else {
            query += ` WHERE 1=1`;
        }
    
        if (type !== null) {
            query += ` AND m.type = :type`;
            replacements.type = type;
        }
    
        // 只排除 t_site_config.value 为 'false' 的记录
        query += ` AND (sc.value IS NULL OR sc.value != 'false')`;
    
        query += ` ORDER BY m.id, m.sort ASC;`;
    
        const [results] = await sequelize.query(query, { replacements });
    
        return results as Menu[];
    }
    
    
    

    async hasChildMenus(menuId: number): Promise<boolean> {
        const count = await Menu.count({
            where: { pid: menuId }
        });
        return count > 0;
    }


    async getAllMenus(user: User): Promise<Menu[]> {
        if (user.get("superAdmin") === 1) {
            return await Menu.findAll().then((menus: Menu[]) => {
                return menus.map((item) => item.toJSON())
            });
        } else {
            const query = `  
                SELECT 
                    m.id,
                    m.pid,
                    m.path,
                    m.title,
                    m.icon,
                    m.type,
                    m.open_style AS openStyle,
                    m.authority,
                    m.sort,
                    DATE_FORMAT(m.created_at, '%Y-%m-%d %H:%i:%S') AS createdAt,
                    DATE_FORMAT(m.updated_at, '%Y-%m-%d %H:%i:%S') AS updatedAt 
                FROM t_menu m  
                JOIN t_role_menu rm ON m.id = rm.menu_id  
                JOIN t_user_role ur ON rm.role_id = ur.role_id  
                WHERE ur.user_id = :userId  
                ORDER BY m.id,m.sort ASC;  
            `;

            const replacements = { userId: user.id };

            const [results] = await sequelize.query(query, {
                replacements
            });
            return results as Menu[]
        }
    }



    async getUserAuthority(user: User): Promise<string[]> {
        let authorities: string[] = [];

        if (user.superAdmin === 1) {
            const allMenus = await Menu.findAll();
            authorities = allMenus.map(menu => menu.authority);
        } else {
            const roleIdList = await this.userRoleService.getRoleIdList(user.id as number);

            const query = `  
                SELECT DISTINCT m.authority  
                FROM t_menu m  
                INNER JOIN t_role_menu rm ON m.id = rm.menu_id  
                WHERE rm.role_id IN (:roleIds);  
            `;

            const [results] = await sequelize.query(query, {
                replacements: { roleIds: roleIdList }
            });

            authorities = results.map((row: any) => row.authority);
        }

        authorities = authorities.filter(authority => authority !== "");

        return authorities;
    }
}
