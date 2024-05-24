import { Transaction } from 'sequelize';
import sequelize from '../db';

export async function defineTransactionWrapper<T>(
    callback: (transaction?: Transaction) => Promise<T>,
    externalTransaction?: Transaction
): Promise<T> {
    let transaction: Transaction | null = null;

    try {
        if (externalTransaction) {
            // 如果有外部事务对象传入，则使用外部事务对象
            return await callback(externalTransaction);
        } else {
            // 否则，创建新的事务对象
            transaction = await sequelize.transaction();
            const result = await callback(transaction);
            await transaction.commit();
            return result;
        }
    } catch (error) {
        if (transaction) {
            console.error("Transaction rollback due to error: ", error); // 添加日志
            await transaction.rollback();
        }
        throw error;
    }
}
