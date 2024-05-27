// RoleMenuService.ts
import RoleMenu from '@/server/models/RoleMenu';
import BaseService from '@/server/base/BaseService';
import { Op } from 'sequelize';

export default class RoleMenuService extends BaseService<RoleMenu> {
    constructor() {
        super(RoleMenu);
    }

    // 保存或更新角色和菜单的关联关系
    async saveOrUpdate(roleId: number, menuIdList: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            // 查询数据库中已存在的角色菜单关系
            const existingMenuIds = await this.getMenuIdList(roleId);

            // 需要新增的菜单ID列表
            const insertMenuIds = menuIdList.filter(menuId => !existingMenuIds.includes(menuId));

            // 需要删除的菜单ID列表
            const deleteMenuIds = existingMenuIds.filter(menuId => !menuIdList.includes(menuId));

            // 批量新增角色菜单关系
            await RoleMenu.bulkCreate(insertMenuIds.map(menuId => ({
                roleId,
                menuId
            })), { transaction });

            // 删除角色菜单关系
            await RoleMenu.destroy({
                where: {
                    roleId,
                    menuId: {
                        [Op.in]: deleteMenuIds
                    }
                },
                transaction
            });
        });
    }

    // 根据角色ID，获取菜单ID列表
    async getMenuIdList(roleId: number): Promise<number[]> {
        const roleMenus = await RoleMenu.findAll({
            where: {
                roleId
            },
            attributes: ['menuId']
        });
        return roleMenus.map(roleMenu => roleMenu.menuId);
    }

    // 根据角色ID列表，删除角色菜单关系
    async deleteByRoleIdList(roleIdList: number[]): Promise<void> {
        await RoleMenu.destroy({
            where: {
                roleId: {
                    [Op.in]: roleIdList
                }
            }
        });
    }

    // 根据菜单ID，删除角色菜单关系
    async deleteByMenuId(menuId: number): Promise<void> {
        await RoleMenu.destroy({
            where: {
                menuId
            }
        });
    }
}
