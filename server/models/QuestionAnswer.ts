import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class QuestionAnswer extends BaseModel<QuestionAnswer> {
    declare questionId: number;
    declare isRight: whetherEnum;
    declare image: string;
    declare content: string;
    declare analysis: string;

    static initQuestionAnswer(sequelize: Sequelize): typeof QuestionAnswer {
        const modelAttributes = {
            questionId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '问题ID',
            },
            isRight: {
                type: DataTypes.INTEGER({ length: 4 }),
                allowNull: true,
                comment: '题目难度等级',
            },
            image: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '选项图片链接',
            },
            content: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: false,
                comment: '答案内容',
            },
            analysis: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: true,
                comment: '答案分析',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'question_answer',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof QuestionAnswer;
    }
}

// 初始化模型，调用 initQuestionAnswer 方法
export const questionAnswerModel = QuestionAnswer.initQuestionAnswer(sequelize) as typeof QuestionAnswer;


