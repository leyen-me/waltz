import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Paper extends BaseModel<Paper> {
    declare userId: number;
    declare examId: number;
    declare title: string;
    declare totalTime: string;
    declare userTime: string;
    declare totalScore: number;
    declare qualifyScore: number;
    declare objScore: number;
    declare subjScore: number;
    declare userScore: number;
    declare hasSaq: whetherEnum;
    declare status: number;
    declare limitTime: string;


    static initPaper(sequelize: Sequelize): typeof Paper {
        const modelAttributes = {
            userId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '用户ID',
            },
            examId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '考试ID',
            },
            title: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '考试标题',
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
            tableName: 'paper',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Paper;
    }
}

// 初始化模型，调用 initPaper 方法
export const paperModel = Paper.initPaper(sequelize) as typeof Paper;


