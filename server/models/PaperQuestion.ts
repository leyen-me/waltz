import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class PaperQuestion extends BaseModel<PaperQuestion> {
    declare paperId: number;
    declare questionId: number;
    declare questionType: number;
    declare isAnswered: whetherEnum;
    declare answer: string;
    declare sort: number;
    declare score: number;
    declare actualScore: number;
    declare isRight: whetherEnum;

    static initPaperQuestion(sequelize: Sequelize): typeof PaperQuestion {
        const modelAttributes = {
            paperId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '试卷ID',
            },
            questionId: {
                type: DataTypes.INTEGER({ length: 20 }),
                allowNull: false,
                comment: '题目ID',
            },
            questionType: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '题目类型',
            },
            isAnswered: {
                type: DataTypes.INTEGER({ length: 4 }),
                allowNull: false,
                comment: '是否已答',
            },
            answer: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: false,
                comment: '主观答案',
            },
            sort: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                defaultValue: 0,
                comment: '排序',
            },
            score: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '单题分分值',
            },
            actualScore: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '实际得分',
            },
            isRight: {
                type:  DataTypes.INTEGER({ length: 4 }),
                allowNull: false,
                comment: '是否答对',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'paper_question',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof PaperQuestion;
    }
}

// 初始化模型，调用 initPaperQuestion 方法
export const paperQuestionModel = PaperQuestion.initPaperQuestion(sequelize) as typeof PaperQuestion;


