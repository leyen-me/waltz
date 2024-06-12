import DashBoardService from '~/server/service/DashBoardService';
const dashBoardService = new DashBoardService();

export default defineWrappedResponseHandler(async (event) => {

    const result = await dashBoardService.getYearlyArticleStatistics();
    return defineOk({ data: result });
});