import Role from '@/server/models/Role';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';
import RoleMenuService from './RoleMenuService';
import UserRoleService from './UserRoleService';

export default class RoleService extends BaseService<Role> {
    private userRoleService = new UserRoleService();
    private roleMenuService = new RoleMenuService();
    constructor() {
        super(Role);
    }

    async selectPage(query: RoleQuery): Promise<BasePageResponse<Role>> {
        return this.page(query);
    }

    async createRole(roleData: CreationAttributes<Role>): Promise<BaseCreateResponse> {
        return await defineTransactionWrapper(async (transaction) => {
            const createdRole = await this.create(roleData, { transaction });
            await this.roleMenuService.saveOrUpdate(createdRole.id as number, roleData.menuIdList);
            return createdRole.id as number;
        });
    }

    async updateRole(roleId: number, roleData: Partial<CreationAttributes<Role>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(roleData, { where: { id: roleId }, transaction });
            await this.roleMenuService.saveOrUpdate(roleId, roleData.menuIdList);
        });
    }

    async deleteRoles(roleIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: roleIds }, transaction });
            await this.userRoleService.deleteByRoleIdList(roleIds);
            await this.roleMenuService.deleteByRoleIdList(roleIds);
        });
    }
    

    async getRoleById(roleId: number): Promise<Role | null> {
        return await Role.findByPk(roleId);
    }

    async getAllRoles(): Promise<Role[]> {
        return await Role.findAll();
    }
}