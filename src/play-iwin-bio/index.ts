process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { PlayIwinBioSite } from "./play.iwin.bio";
import { HttpsProxyAgent } from "https-proxy-agent";
import cron from "node-cron";
import BankInfoRepository from "../db/repo/bankInfoRepository";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { IBankCode, readJsonFile } from "../utils/readJsonFile";
let site = new PlayIwinBioSite();
const bankInfoRepository = new BankInfoRepository();

(async () => {
  try {
    const proxy = new HttpsProxyAgent("127.0.0.1:8080");
    for (let i = 0; i < 5; i++) {
      let { username, xtoken } = await site.register();
      if (username && xtoken) {
        await site.updateUsername(
          `${username.slice(0, 6)}${Math.floor(100 + Math.random() * 900)}`,
          xtoken
        );
        let condition = true;
        do {
          let amount = Math.floor(100000 + Math.random() * 900000);
          const c = (
            await readJsonFile<IBankCode>(`${__dirname}/bankcode.json`)
          ).rows;
          let randomIndex = Math.floor(Math.random() * c.length);
          console.log(`BANK_CODE = ${c[randomIndex].bankcode}`);

          let bankInfo = await site.deposit(
            xtoken,
            amount,
            c[randomIndex].bankcode
          );
          if (bankInfo?.message) {
            console.log(
              `This account have suspended. Please login another account.`
            );
            condition = false;
          }
          let obj = await bankInfoRepository.findByAccountNo(
            bankInfo.account_no
          );
          if (obj.message == "Bank info not found") {
            var response = await bankInfoRepository.create({
              account_number: bankInfo.account_no,
              account_name: bankInfo.account_name,
              bank_name: bankInfo.bank_name,
            });
            console.log(response);
          }
        } while (condition);
      }
    }
  } catch (err: any) {
    logger.error(`Cron job failed: ${err.message}`);
  }
})();
