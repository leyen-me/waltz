import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Exam extends BaseModel<Exam> {
    declare title: string;
    declare content: number;
    declare openType: ExamOpenTypeEnum;
    declare status: PaperStatusEnum;
    declare isLimit: whetherEnum;
    declare startTime: string;
    declare endTime: string;
    declare totalScore: number;
    declare totalTime: string;
    declare qualifyScore: number;


    static initExam(sequelize: Sequelize): typeof Exam {
        const modelAttributes = {
            title: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: '考试名称',
            },
            content: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '考试描述',
            },
            openType: {
                type: DataTypes.ENUM({ values: ["public", "protected", "default", "private"] }),
                allowNull: true,
                comment: '考试标题',
            },
            status: {
                type: DataTypes.ENUM({ values: ["ing", "wait_opt", "finished", "break"] }),
                allowNull: false,
                comment: '考试状态',
            },
            isLimit: {
                type:  DataTypes.INTEGER({ length: 4 }),
                allowNull: false,
                comment: '是否限时',
            },
            startTime: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '开始时间',
            },
            endTime: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '结束时间',
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
        };

        const modelOptions = {
            sequelize,
            tableName: 'exam',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Exam;
    }
}

// 初始化模型，调用 initExam 方法
export const examModel = Exam.initExam(sequelize) as typeof Exam;


