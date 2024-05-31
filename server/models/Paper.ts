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
    declare objectScore: number;
    declare subjectScore: number;
    declare userScore: number;
    declare hasSaq: whetherEnum;
    declare status: PaperStatusEnum;
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
            totalTime: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '考试时长',
            },
            userTime: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '用户时长',
            },
            totalScore: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '试卷总分',
            },
            qualifyScore: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '及格分',
            },
            objectScore: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '客观分',
            },
            subjectScore: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: true,
                comment: '主观分',
            },
            userScode: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: false,
                comment: '用户得分',
            },
            hasSaq: {
                type:  DataTypes.INTEGER({ length: 4 }),
                allowNull: false,
                comment: '是否包含简答题',
            },
            status: {
                type: DataTypes.ENUM({ values: ["ing", "wait_opt", "finished", "break"] }),
                allowNull: false,
                comment: '试卷状态',
            },
            limitTime: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '截止时间',
            },
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


