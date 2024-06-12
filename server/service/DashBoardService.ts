
import { Op, QueryTypes } from "sequelize";
import sequelize from "../db";
import Article from "../models/Article";
import User from "../models/User";
import Comment from "../models/Comment";
export default class dashBoardService {

    async getBasicStatistics(): Promise<{ articleCount: number, viewsCount: number, userCount: number, commentCount: number }> {
        // 获取文章数
        const articleCount = await Article.count();

        // 获取浏览数
        const viewsCount = await Article.sum('views_count');

        // 获取用户数
        const userCount = await User.count();

        // 获取评论数
        const commentCount = await Comment.count();

        return {
            articleCount: articleCount,
            viewsCount: viewsCount,
            userCount: userCount,
            commentCount: commentCount
        };
    }

    async getYearlyArticleStatistics(): Promise<{ name: string, value: number }[]> {
        const currentYear = new Date().getFullYear();
        const monthlyArticleCounts: { name: string, value: number }[] = [];

        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(currentYear, month - 1, 1);
            const endDate = new Date(currentYear, month, 0);

            const articleCount = await Article.count({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });

            const monthName = this.getMonthName(month);

            monthlyArticleCounts.push({ name: monthName, value: articleCount });
        }

        return monthlyArticleCounts;
    }

    private getMonthName(month: number): string {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month - 1];
    }

    async getCategoryPercentage(): Promise<{ category: string, percentage: number }[]> {
        const query = `
            SELECT
                c.title AS name,
                COUNT(a.id) AS value
            FROM
                t_category c
            LEFT JOIN
                t_article a ON c.id = a.category_id
            GROUP BY
                c.title
        `;

        const categoryPercentage: { category: string, percentage: number }[] = await sequelize.query(query, { type: QueryTypes.SELECT });

        return categoryPercentage;
    }
}