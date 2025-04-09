process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { PlayIwinBioSite } from "./play.iwin.bio";
import { HttpsProxyAgent } from "https-proxy-agent";
import cron from "node-cron";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { IBankCode, readJsonFile } from "../utils/readJsonFile";
import { AccountService } from "../services/accountService";
import { BankAccountService } from "../services/bankAccountService";
import { createAndSaveProxies, getListProxies } from "../services/proxyService";
let site = new PlayIwinBioSite();
const accountService = new AccountService();
const bankACcountService = new BankAccountService();

cron.schedule('* * * * *',
  async () => {
    try {
      await createAndSaveProxies(1);
      const proxies = await getListProxies(1);
      if (proxies) {
        console.log("LIST PROXY:", proxies);

        for (let i = 0; i < proxies.length; i++) {
          const proxy = {
            host: proxies[i].server.split(':')[0],
            port: Number(proxies[i].server.split(':')[1]),
            protocol: 'https'
          };

          let { username, xtoken, password } = await site.register(proxy);
          if (username && xtoken) {
            const _ = await accountService.createAccount({ username, password })

            await site.updateUsername(
              `${username.slice(0, 6)}${Math.floor(100 + Math.random() * 900)}`,
              xtoken,
              proxy
            );
            let condition = true;
            console.log(`Bat dau login`);

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
                c[randomIndex].bankcode,
                proxy
              );
              if (bankInfo?.message) {
                console.log(
                  `This account have suspended. Please login another account.`
                );
                condition = false;
              }
              let obj = await bankACcountService.getAccountByAccountNo(
                bankInfo.account_no
              );
              if (!obj) {
                var response = await bankACcountService.createAccount({
                  account_no: bankInfo.account_no,
                  account_name: bankInfo.account_name,
                  bank_name: bankInfo.bank_name,
                });
                console.log(response);
              }
            } while (condition);
          }
        }
      }

    } catch (err: any) {
      logger.error(`Cron job failed: ${err.message}`);
    }
  }
  ,)
