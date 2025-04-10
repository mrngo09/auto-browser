process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import axios from "axios";
import * as fs from "fs";
import puppeteer from "puppeteer";
import {
  generateSecurePassword,
  generateVietnameseUsername,
} from "../utils/generateString";
import { delay } from "../utils/random";
import { solveCaptchaFromImage } from "../utils/captchaSolver";
import { saveBase64AsImage } from "../utils";

async function main() {
  let proxy = {
    server: "localhost:8080",
  };
  let username = generateVietnameseUsername();
  let psw = generateSecurePassword();
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    devtools: true,
  });
  const page = await browser.newPage();
  await browser.deleteCookie();
  await page.setViewport({ width: 800, height: 600 });
  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://play.son.club", ["geolocation"]);

  await page.goto("https://play.son13.club/", { waitUntil: "load" });
  //   await page.reload();
  //   await delay(1000);
  await delay(5000);

  let captchaText = "";
  let captchaV2Url = "data:image/png;base64";
  page.on("response", async (response) => {
    try {
      const request = response.request();
      const url = request.url();
      // const method = request.method();
      if (url.includes(captchaV2Url)) {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        console.log("Captcha image URL:", response.data);

        // Save the image data to a file as PNG
        fs.writeFileSync(
          __dirname + "\\captchav2.png",
          Buffer.from(response.data)
        );

        captchaText =
          (await solveCaptchaFromImage(__dirname + "\\captchav2.png")) || "";
      }
    } catch (error) {
      console.error("Error in response handler:", error);
    }
  });

  await delay(1000);
  await page.mouse.click(400, 567, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(Register form)

  await delay(2000);
  await page.mouse.click(370, 230, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(username)
  await page.keyboard.type(username); // Nhập username vào input
  console.log(`username: ${username}`);

  await delay(2000);
  await page.mouse.click(370, 270, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(password)
  await page.keyboard.type(psw); // Nhập password vào input
  console.log(`password: ${psw}`);

  await delay(2000);
  await page.mouse.click(370, 320, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(re-password)
  await page.keyboard.type(psw); // Nhập re-password vào input
  console.log(`re-password: ${psw}`);

  await delay(1000);
  await page.mouse.click(370, 370, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(captcha code)
  await page.keyboard.type(captchaText); // Nhập captcha vào input

  await delay(1000);
  await page.mouse.click(370, 410, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(btn confirm)

  //   await browserManager.close();
}

main();
