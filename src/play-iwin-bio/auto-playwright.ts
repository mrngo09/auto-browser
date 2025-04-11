import dotenv from "dotenv";
import { BrowserManager } from "../controllers/browser";
import { delay } from "../utils/random";
import axios from "axios";

dotenv.config();

async function main() {
  const browserManager = BrowserManager.getInstance();
  await browserManager.navigateTo("https://play.iwin.bio");
  await delay(3000);
  await browserManager.clearData();
  const page = await browserManager.getCurrentPage();
  await page.reload();
  await delay(3000);

  //   await page.mouse.click();
  //   const sessionId = await page.evaluate(() => {
  //     return localStorage.getItem("hitsession_id");
  //   });
  //   console.log(sessionId);

  //   await browserManager.close();
}

main();
