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
    

    static initPaper(sequelize: Sequelize): typeof Paper {
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
            tableName: 'paper',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Paper;
    }
}

// 初始化模型，调用 initPaper 方法
export const paperModel = Paper.initPaper(sequelize) as typeof Paper;


