process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { PlayIwinBioSite } from "./play.iwin.bio";
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

async function AutoDeposit(xtoken: string, proxy: any) {
  try {
    let condition = true;
    do {
      let amount = Math.floor(100000 + Math.random() * 900000);
      const c = (await readJsonFile<IBankCode>(`${__dirname}/bankcode.json`))?.rows;
      let randomIndex = Math.floor(Math.random() * c.length);
      let bankInfo = await site.deposit(
        xtoken,
        amount,
        c[randomIndex].bankcode,
        proxy
      );
      if (bankInfo?.message) {
        console.log(bankInfo?.message);
        condition = false;
      }
      if (bankInfo?.account_no) {
        let obj = await bankACcountService.getAccountByAccountNo(
          bankInfo?.account_no
        );
        if (!obj) {
          var inspect = await bankACcountService.createAccount({
            account_no: bankInfo.account_no,
            account_name: bankInfo.account_name,
            bank_name: bankInfo.bank_name,
          });
          console.log(`Matched a new bank account:`, inspect);

        }
      }
    } while (condition);
  } catch (error: any) {
    console.log(`Error in AutoDeposit: ${error?.message}`);
  }
}

cron.schedule("* * * * *", async () => {
  try {
    await createAndSaveProxies(1);
    const proxies = await getListProxies(1);
    if (proxies) {
      const proxy = {
        host: proxies[0]?.server.split(":")[0] || `183.81.33.189`,
        port: Number(proxies[0]?.server.split(":")[1]) || 40000,
        protocol: 'http'
      };
      for (let j = 0; j < 4; j++) {
        // let proxy = null;
        let { username, xtoken, password } = await site.register(proxy);
        console.log(`Account created sucessfully: ${JSON.stringify({ username, xtoken, password })} `);

        if (username != "" && xtoken != "") {
          await accountService.createAccount({
            username,
            password,
          });
          await site.updateUsername(
            `${username.slice(0, 6)}${Math.floor(100 + Math.random() * 900)} `,
            xtoken,
            proxy
          );
          await AutoDeposit(xtoken, proxy);
        }
      }
    }
  } catch (err: any) {
    logger.error(`Cron job failed: ${err.message} `);
  }
  // });
})

