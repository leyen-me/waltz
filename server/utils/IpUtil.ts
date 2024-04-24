import { useFetch } from "nuxt/app";

/**
 * 根据请求获取公共 IP 地址
 * @param req 请求对象
 * @returns 公共 IP 地址
 */
const getPublicIP = (req: any): string => {
    const headers = req.headers;
    if (headers['x-real-ip']) {
        return headers['x-real-ip'];
    }
    if (headers['x-forwarded-for']) {
        const ipList = headers['x-forwarded-for'];
        return ipList.split(',')[0];
    }
    return '0.0.0.0';
};

/**
 * 根据 IP 地址获取地理位置信息
 * @param ip IP 地址
 * @returns 地理位置信息
 */
const getIpAddress = async (ip: string): Promise<string> => {
    const url = `https://ipaddquery.api.bdymkt.com/ip/query?ip=${ip}`;
    try {
        const response = await useFetch(url, { method: 'POST' }) as any;
        return response.code === 200 ? `${response.data.region}-${response.data.city}` : '未知';
    } catch (error) {
        console.error('Error fetching IP address information:', error);
        return '未知';
    }
};

/**
 * 获取 IP 地址的地理位置信息
 * @param req 请求对象
 * @returns 地理位置信息
 */
const resolveIpAddress = async (req: any): Promise<string> => {
    const ip = getPublicIP(req);
    return await getIpAddress(ip);
};

export default resolveIpAddress;