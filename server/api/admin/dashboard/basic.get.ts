import DashBoardService from '~/server/service/DashBoardService';
const dashBoardService = new DashBoardService();

export default defineWrappedResponseHandler(async (event) => {

    const result = await dashBoardService.getBasicStatistics();
    return defineOk({ data: result });
});