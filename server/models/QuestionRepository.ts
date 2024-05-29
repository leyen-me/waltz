import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class QuestionRepository extends BaseModel<QuestionRepository> {
    declare questionId: number;
    declare repositoryId: number;
    declare questionType: number;
    declare sort: number;

    static initQuestionRepository(sequelize: Sequelize): typeof QuestionRepository {
        const modelAttributes = {
            questionId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '问题ID',
            },
            repositoryId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '归属题库',
            },
            questionType: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '题目类型',
            },
            sort: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '排序',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'question_repository',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof QuestionRepository;
    }
}

// 初始化模型，调用 initQuestionRepository 方法
export const questionRepositoryModel = QuestionRepository.initQuestionRepository(sequelize) as typeof QuestionRepository;


