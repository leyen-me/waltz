import UserRole from '@/server/models/UserRole';
import BaseService from '@/server/base/BaseService';
import { Op } from 'sequelize';

export default class UserRoleService extends BaseService<UserRole> {
    constructor() {
        super(UserRole);
    }

    // 保存或更新用户和角色的关联关系
    async saveOrUpdate(userId: number, roleIdList: number[]): Promise<void> {
        // 查询数据库中已存在的用户角色关系
        const existingRoleIds = await this.getRoleIdList(userId);

        // 需要新增的角色ID列表
        const insertRoleIds = roleIdList.filter(roleId => !existingRoleIds.includes(roleId));

        console.log(insertRoleIds);
        

        // 需要删除的角色ID列表
        const deleteRoleIds = existingRoleIds.filter(roleId => !roleIdList.includes(roleId));

        // 批量新增用户角色关系
        await UserRole.bulkCreate(insertRoleIds.map(roleId => ({
            userId,
            roleId
        })));

        // 删除用户角色关系
        await UserRole.destroy({
            where: {
                userId,
                roleId: {
                    [Op.in]: deleteRoleIds
                }
            }
        });
    }

    // 分配角色给用户列表
    async saveUserList(roleId: number, userIdList: number[]): Promise<void> {
        // 删除原有的用户角色关联关系
        await UserRole.destroy({
            where: {
                roleId
            }
        });

        // 创建新的用户角色关联关系
        const userRoleData = userIdList.map(userId => ({
            userId,
            roleId
        }));
        await UserRole.bulkCreate(userRoleData);
    }

    // 根据角色ID列表，删除用户角色关系
    async deleteByRoleIdList(roleIdList: number[]): Promise<void> {
        await UserRole.destroy({
            where: {
                roleId: {
                    [Op.in]: roleIdList
                }
            }
        });
    }

    // 根据用户ID列表，删除用户角色关系
    async deleteByUserIdList(userIdList: number[]): Promise<void> {
        await UserRole.destroy({
            where: {
                userId: {
                    [Op.in]: userIdList
                }
            }
        });
    }

    // 根据角色ID和用户ID列表，删除用户角色关系
    async deleteByRoleIdAndUserIdList(roleId: number, userIdList: number[]): Promise<void> {
        await UserRole.destroy({
            where: {
                roleId,
                userId: {
                    [Op.in]: userIdList
                }
            }
        });
    }

    // 根据用户ID，获取角色ID列表
    async getRoleIdList(userId: number): Promise<number[]> {
        const userRoles = await UserRole.findAll({
            where: {
                userId
            },
            attributes: ['roleId']
        });
        return userRoles.map(userRole => userRole.roleId);
    }
}
