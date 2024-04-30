import Role from '@/server/models/Role';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';
import RoleMenuService from './RoleMenuService';

export default class RoleService extends BaseService<Role> {
    private roleMenuService!: RoleMenuService;
    constructor() {
        super(Role);
    }

    async selectPage(query: RoleQuery): Promise<BasePageResponse<Role>> {
        return this.page(query);
    }

    async createRole(roleData: CreationAttributes<Role>): Promise<BaseCreateResponse> {
        const createdRole = await this.create(roleData);
        this.roleMenuService.saveOrUpdate(createdRole.id as number, roleData.roleIdList);
        return createdRole.id as number;
    }

    async updateRole(roleId: number, roleData: Partial<CreationAttributes<Role>>): Promise<void> {
        await this.update(roleData, { where: { id: roleId } });
        this.roleMenuService.saveOrUpdate(roleId, roleData.roleIdList);
    }

    async deleteRoles(roleIds: number[]): Promise<void> {
        await this.delete({ where: { id: roleIds } });
    }

    async getRoleById(roleId: number | string): Promise<Role | null> {
        return await Role.findByPk(roleId);
    }

    async getAllRoles(): Promise<Role[]> {
        return await Role.findAll();
    }
}