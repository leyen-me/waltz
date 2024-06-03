import { SequelizeDatabaseErrorHandler } from "./SequelizeDatabaseErrorHandler";

export class SequelizeUniqueConstraintErrorHandler extends SequelizeDatabaseErrorHandler {
    canHandle(err: any): boolean {
        return err.name === 'SequelizeUniqueConstraintError';
    }

    handle(err: any): { code?: number, msg: string } {
        return { msg: '数据库唯一约束错误：' + err.errors.map((e: any) => e.message).join(', ') };
    }
}