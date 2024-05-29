import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Question extends BaseModel<Question> {
    declare questionType: number;
    declare level: QuestionLevelEnum;
    declare image: string;
    declare content: string;
    declare remark: string;
    declare analysis: string;

    static initQuestion(sequelize: Sequelize): typeof Question {
        const modelAttributes = {
            questionType: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '题目类型',
            },
            level: {
                type: DataTypes.ENUM({ values: ["simple", "general", "intermediate", "challenging", "arduous"] }),
                allowNull: true,
                comment: '题目难度等级',
            },
            image: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '题目图片链接',
            },
            content: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: false,
                comment: '题目内容',
            },
            remark: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '题目备注',
            },
            analysis: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: true,
                comment: '题目整题解析',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'question',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Question;
    }
}

// 初始化模型，调用 initQuestion 方法
export const questionModel = Question.initQuestion(sequelize) as typeof Question;


