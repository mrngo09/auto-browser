// src/services/proxyService.ts
import axios from 'axios';
import { AppDataSource } from '../data-source';
import { ProxySockS5 } from '../entities/ProxySockS5';

export async function getListProxies(amount: number) {
    try {
        // Initialize Data Source if not already initialized
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Data Source initialized for proxy creation.");
        }

        const proxyRepository = AppDataSource.getRepository(ProxySockS5);

        const proxies = await proxyRepository.find({
            order: {
                createdAt: 'DESC', // Sort by createdAt in descending order (newest first)
            },
            take: amount, // Limit to the specified number of records (default 10)
        });
        console.log(`Fetched ${proxies.length} latest proxies.`);
        return proxies;

    } catch (error: any) {
        console.log(`Error in ProxyService. func getListProxies ${error}`);

    }

}
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function createAndSaveProxies(count: number = 2) {
    try {
        // Initialize Data Source if not already initialized
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Data Source initialized for proxy creation.");
        }

        const proxyRepository = AppDataSource.getRepository(ProxySockS5);
        let proxies: ProxySockS5[] = [];

        // Fetch proxies from API
        for (let i = 0; i < count; i++) {
            try {
                let forwardPort = getRandomInt(30000, 30004)
                const response = await axios.get(`http://192.168.0.103:9049/v1/today_random_ip?num=1&country=all&state=all&city=all&t=json&port=${forwardPort}&isp=all`);
                console.log("API PROXY 922 PRoxy", response.data.data[0]);

                // Assume API returns an array or string of proxies
                let proxyData = response.data.data[0]

                const proxy = new ProxySockS5();
                proxy.server = `${proxyData?.ip}:${proxyData?.port | 30000}` || `127.0.0.1:8080`;
                // Save to database
                const newProxy = proxyRepository.create(proxy);
                const savedProxy = await proxyRepository.save(newProxy);
                proxies.push(savedProxy);
                console.log(`Saved proxy ${i + 1}: ${proxy}`);
                return proxies

            } catch (apiError: any) {
                console.error(`Failed to fetch proxy ${i + 1}:`, apiError);
                continue; // Skip to next iteration if API call fails
            }
        }

        console.log(`Successfully created and saved ${proxies.length} proxies.`);
        return proxies;

    } catch (error) {
        console.error('Error in createAndSaveProxies:', error);
        throw error;
    }
}
