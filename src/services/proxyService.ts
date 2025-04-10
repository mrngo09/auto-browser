// src/services/proxyService.ts
import axios from "axios";
import { AppDataSource } from "../data-source";
import { ProxySockS5 } from "../entities/ProxySockS5";

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
        createdAt: "DESC", // Sort by createdAt in descending order (newest first)
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
      let forwardPort = getRandomInt(30000, 30001);
      const response = await axios.get(
        `http://183.81.33.189:9049/v1/ips?num=1&country=all&state=all&city=all&zip=all&t=txt&port=40000&isp=all&start=&end=`
      );
      console.log("API PROXY 922 PRoxy", response.data);

      // Assume API returns an array or string of proxies
      let proxyData: string = response.data;

      const proxy = new ProxySockS5();
      proxy.server = proxyData.trim() || `127.0.0.1:40000`;
      // Save to database
      const newProxy = proxyRepository.create(proxy);
      const savedProxy = await proxyRepository.save(newProxy);
      proxies.push(savedProxy);
      console.log(`Saved proxy ${i + 1}: ${proxy}`);
    }
    console.log(`Successfully created and saved ${proxies.length} proxies.`);
    return proxies;
  } catch (error) {
    console.error("Error in createAndSaveProxies:", error);
    throw error;
  }
}
