import Role from '@/server/models/Role';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';

export default class RoleService extends BaseService<Role> {
    constructor() {
        super(Role);
    }

    async selectPage(query: RoleQuery): Promise<{ data: Role[]; meta: any }> {
        return this.page(query);
    }

    async createRole(roleData: CreationAttributes<Role>): Promise<{ message: string }> {
        const createdRole = await this.create(roleData);
        if (createdRole) {
            return { message: 'Role created successfully' };
        }
        throw Error("Failed to create role");
    }

    async updateRole(roleId: number, roleData: Partial<CreationAttributes<Role>>): Promise<{ message: string }> {
        const options = { where: { id: roleId } };
        const affectedRows = await this.update(roleData, options);
        if (affectedRows > 0) {
            return { message: 'Role updated successfully' };
        }
        throw Error("Failed to update role")
    }

    async deleteRoles(roleIds: number[]): Promise<{ message: string }> {
        const options = { where: { id: roleIds } };
        const deletedCount = await this.delete(options);
        if (deletedCount > 0) {
            return { message: 'Roles deleted successfully' };
        }
        throw Error("Failed to delete roles");
    }

    async getRoleById(roleId: number | string): Promise<Role | null> {
        return await Role.findByPk(roleId);
    }

    async getAllRoles(): Promise<Role[]> {
        return await Role.findAll();
    }
}