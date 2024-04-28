import User from '@/server/models/User';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';

export default class UserService extends BaseService<User> {
    constructor() {
        super(User);
    }

    async selectPage(query: UserQuery): Promise<BasePageResponse<User>> {
        return this.page(query);
    }

    async createUser(userData: CreationAttributes<User>): Promise<{ message: string }> {
        const createUser = await this.create(userData);
        if (createUser) {
            return { message: 'User created successfully' };
        }
        throw Error("Failed to create user");
    }

    async updateUser(userId: number, userData: Partial<CreationAttributes<User>>): Promise<{ message: string }> {
        const options = { where: { id: userId } };
        if (userData.password) {
            userData.password = defineEncodeHash(userData.password);
        }
        const affectedRows = await this.update(userData, options);
        if (affectedRows > 0) {
            return { message: 'User updated successfully' };
        }
        throw Error("Failed to update user")
    }

    async deleteUsers(userIds: number[]): Promise<{ message: string }> {
        const options = { where: { id: userIds } };
        const deletedCount = await this.delete(options);
        if (deletedCount > 0) {
            return { message: 'Users deleted successfully' };
        }
        throw Error("Failed to delete users");
    }

    async getUserById(userId: number | string): Promise<User | null> {
        return await User.findByPk(userId);
    }

    async getAllUsers(): Promise<User[]> {
        return await User.findAll();
    }
}
