import User from '@/server/models/User';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';
import UserRoleService from '~/server/service/UserRoleService';

export default class UserService extends BaseService<User> {
    private userRoleService!: UserRoleService;
    constructor() {
        super(User);
    }

    // setUserRoleService(userRoleService: UserRoleService) {
    //     this.userRoleService = userRoleService;
    // }

    async selectPage(query: UserQuery): Promise<BasePageResponse<User>> {
        return this.page(query);
    }

    async createUser(userData: CreationAttributes<User>): Promise<{ message: string }> {
        const existingUserByUsername = await this.getByUsername(userData.username);
        if (existingUserByUsername) {
            throw new Error("username is existed in db");
        }

        const existingUserByEmail = await this.getByEmail(userData.email);
        if (existingUserByEmail) {
            throw new Error("email is existed in db");
        }

        const createUser = await this.create(userData);
        this.userRoleService.saveOrUpdate(createUser.id as number, userData.roleIdList);
        if (createUser) {
            return { message: 'User created successfully' };
        }
        throw Error("Failed to create user");
    }

    async updateUser(userId: number, userData: Partial<CreationAttributes<User>>): Promise<{ message: string }> {
        const options = { where: { id: userId } };

        // 检查用户名是否已经存在
        if (userData.username) {
            const existingUserByUsername = await this.getByUsername(userData.username);
            if (existingUserByUsername && existingUserByUsername.id !== userId) {
                throw new Error("username is existed in db");
            }
        }

        // 检查邮箱是否已经存在
        if (userData.email) {
            const existingUserByEmail = await this.getByEmail(userData.email);
            if (existingUserByEmail && existingUserByEmail.id !== userId) {
                throw new Error("email is existed in db");
            }
        }

        if (userData.password) {
            userData.password = defineEncodeHash(userData.password);
        }
        const affectedRows = await this.update(userData, options);
        if (affectedRows > 0) {
            this.userRoleService.saveOrUpdate(userId, userData.roleIdList);
            return { message: 'User updated successfully' };
        }
        throw Error("Failed to update user")
    }

    async deleteUsers(userIds: number[]): Promise<{ message: string }> {
        const options = { where: { id: userIds } };
        const deletedCount = await this.delete(options);
        if (deletedCount > 0) {
            this.userRoleService.deleteByUserIdList(userIds);
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

    async getByUsername(username: string): Promise<User | null> {
        const user = await User.findOne({ where: { username: username } });
        return user;
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email: email } })
        return user;
    }
}
