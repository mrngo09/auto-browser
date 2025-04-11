import dotenv from "dotenv";
import { delay } from "../utils/random";
import axios from "axios";
import { getPosition } from "../utils/getPositionPuppeeter";
import puppeteer from "puppeteer";
import * as fs from "fs";
import { solveCaptchaFromImage } from "../utils/captchaSolver";
import {
  generateSecurePassword,
  generateVietnameseUsername,
} from "../utils/generateString";

dotenv.config();

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    // devtools: true,
  });
  const page = await browser.newPage();
  await browser.deleteCookie();
  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://play.son.club", ["geolocation"]);
  await page.setViewport({ width: 800, height: 600 });
  console.log("Starting scraping https://play.son13.club/...");
  await page.goto("https://play.son.club/", { waitUntil: "networkidle2" });
  //   delay(8000);
  let captchaText = "";
  let captchaV2Url = "data:image/png;base64";
  //   page.on("response", async (response) => {
  //     try {
  //       const request = response.request();
  //       const url = request.url();
  //       if (url.includes(captchaV2Url)) {
  //         const response = await axios.get(url, { responseType: "arraybuffer" });

  //         // let base64Image = url.split(";base64,").pop();
  //         // Save the image data to a file as PNG
  //         fs.writeFileSync(
  //           __dirname + "/resources/captchav2.png",
  //           Buffer.from(response.data)
  //         );

  //         // captchaText =
  //         //   (
  //         //     await solveCaptchaFromImage(__dirname + "/resources/captchav2.png")
  //         //   )?.toUpperCase() || "";
  //       }
  //     } catch (error) {
  //       console.log("Error in response handler:", error);
  //     }
  //   });

  let username = generateVietnameseUsername();
  let password = generateSecurePassword();
  await page.mouse.move(400, 565, {steps: 10}); // Di chuyển chuột đến tọa độ popup form đăng ký(Register form) 
  await page.mouse.down({ button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(Register form)
  await page.mouse.up({ button: "left" });
  //   delay(3000);
  //   await page.mouse.click(370, 230, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(username)
  //   await page.keyboard.type(username); // Nhập username vào input

  //   delay(1000);
  //   await page.mouse.click(370, 270, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(psw)
  //   await page.keyboard.type(password); // Nhập password vào input

  //   delay(1000);
  //   await page.mouse.click(370, 320, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(re-psw)
  //   await page.keyboard.type(password, { delay: 100 }); // Nhập re-password vào input

  //   delay(5000);
  //   await page.mouse.click(370, 370, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(captcha)
  //   await page.keyboard.type(captchaText, { delay: 100 }); // Nhập captcha vào input

  //   delay(1000);
  //   await page.mouse.click(370, 410, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(register)
}

main();
