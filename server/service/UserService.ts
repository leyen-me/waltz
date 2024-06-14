import User from '@/server/models/User';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';
import UserRoleService from '@/server/service/UserRoleService';
import UserAlreadyExistsError from '../error/sys/user/UserAlreadyExistsError';
import UserEmailAlreadyExistsError from '../error/sys/user/UserEmailAlreadyExistsError';
import UserNameAlreadyExistsError from '../error/sys/user/UserNameAlreadyExistsError';

export default class UserService extends BaseService<User> {

    private userRoleService = new UserRoleService();

    constructor() {
        super(User);
    }

    async selectPage(query: UserQuery): Promise<BasePageResponse<User>> {
        return this.page(query);
    }

    async createUser(userData: CreationAttributes<User>): Promise<BaseCreateResponse> {
        return await defineTransactionWrapper(async (transaction) => {
            // 检查用户名是否已经存在
            if (userData.username) {
                const existingUserByUsername = await this.getByUsername(userData.username);
                if (existingUserByUsername) {
                    throw new UserAlreadyExistsError()
                }
            }

            // 检查邮箱是否已经存在
            if (userData.email) {
                const existingUserByEmail = await this.getByEmail(userData.email);
                if (existingUserByEmail) {
                    throw new UserEmailAlreadyExistsError()
                }
            }

            if (userData.password) {
                userData.password = defineEncodeHash(userData.password);
            } else {
                userData.password = undefined;
            }

            const createUser = await this.create(userData, { transaction });

            if(userData.roleIdList){
                await this.userRoleService.saveOrUpdate(createUser.id as number, userData.roleIdList);
            }
            return createUser.id as number;
        });
    }

    async updateUser(userId: number, userData: Partial<CreationAttributes<User>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            // 检查用户名是否已经存在
            if (userData.username) {
                const existingUserByUsername = await this.getByUsername(userData.username);
                if (existingUserByUsername && existingUserByUsername.id !== userId) {
                    throw new UserNameAlreadyExistsError()
                }
            }

            // 检查邮箱是否已经存在
            if (userData.email) {
                const existingUserByEmail = await this.getByEmail(userData.email);
                if (existingUserByEmail && existingUserByEmail.id !== userId) {
                    throw new UserEmailAlreadyExistsError()
                }
            }

            if (userData.password) {
                userData.password = defineEncodeHash(userData.password);
            } else {
                userData.password = undefined;
            }
            
            await this.update(userData, { where: { id: userId }, transaction });
            await this.userRoleService.saveOrUpdate(userId, userData.roleIdList);
        });
    }

    async deleteUsers(userIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: userIds }, transaction });
            await this.userRoleService.deleteByUserIdList(userIds);
        });
    }

    async getUserById(userId: number): Promise<User | null> {
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
        const user = await User.findOne({ where: { email: email } });
        return user;
    }
}