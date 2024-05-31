import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class ExamRepository extends BaseModel<ExamRepository> {
    declare examId: number;
    declare repositoryId: number;
    declare questionType: number;
    declare count: number;
    declare score: number;


    static initExamRepository(sequelize: Sequelize): typeof ExamRepository {
        const modelAttributes = {
            examId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '考试名称',
            },
            repositoryId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '题库ID',
            },
            questionType: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '题目类型',
            },
            count: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '数量',
            },
            score: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '分数',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'exam_repository',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof ExamRepository;
    }
}

// 初始化模型，调用 initExamRepository 方法
export const examRepositoryModel = ExamRepository.initExamRepository(sequelize) as typeof ExamRepository;


