import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class PaperQuestionAnswer extends BaseModel<PaperQuestionAnswer> {
    declare paperId: number;
    declare questionId: number;
    declare answerId: number;
    declare sort: number;
    declare isRight: whetherEnum;
    declare isChecked: whetherEnum;
    declare label: string;

    static initPaperQuestionAnswer(sequelize: Sequelize): typeof PaperQuestionAnswer {
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
            answerId: {
                type: DataTypes.INTEGER({ length: 20 }),
                allowNull: false,
                comment: '答案ID',
            },
            sort: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                defaultValue: 0,
                comment: '排序',
            },
            isRight: {
                type: DataTypes.INTEGER({ length: 4 }),
                allowNull: false,
                comment: '是否答对',
            },
            isChecked: {
                type: DataTypes.INTEGER({ length: 4 }),
                allowNull: false,
                comment: '是否选中',
            },
            label: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: '选项标签',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'paper_question_answer',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof PaperQuestionAnswer;
    }
}

// 初始化模型，调用 initPaperQuestionAnswer 方法
export const paperQuestionAnswerModel = PaperQuestionAnswer.initPaperQuestionAnswer(sequelize) as typeof PaperQuestionAnswer;


