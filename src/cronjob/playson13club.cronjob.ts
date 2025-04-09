process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import {
  generateVietnameseUsername,
  generateSecurePassword,
} from "../utils/generateString";
import axios from "axios";
import puppeteer from "puppeteer";
import * as fs from "fs";

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    devtools: true,
  });
  const page = await browser.newPage();
  await browser.deleteCookie();
  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://play.son.club", ["geolocation"]);
  await page.setViewport({ width: 800, height: 600 });
  console.log("Starting scraping https://play.son13.club/...");
  await page.goto("https://play.son.club/", { waitUntil: "networkidle2" });
  // await getPosition(page);

  // let captchaV2Url = "https://portal.taison01.com/api/account/captchav2";
  let captchaV2Url = "data:image/png;base64";

  let captchaText = "";
  // page.on("response", async (response) => {
  //   try {
  //     const request = response.request();
  //     const url = request.url();
  //     // const method = request.method();
  //     if (url.includes(captchaV2Url)) {
  //       const response = await axios.get(url, { responseType: "arraybuffer" });
  //       console.log("Captcha image URL:", response.data);

  //       // Save the image data to a file as PNG
  //       fs.writeFileSync("./resources/captchav2.png", Buffer.from(response.data));
  //       //   let base64Image = url.split(";base64,").pop();
  //       //   console.log(base64Image);

  //       //   const buffer = Buffer.from(base64Image, "base64");
  //       //   fs.writeFileSync("./resources/captchav2.png", buffer);
  //       //   fs.writeFileSync("captchav2.json", JSON.stringify(base64Image, null, 2));

  //       captchaText =
  //         (await solveCaptchaFromImage("./resources/captchav2.png")) || null;
  //     }
  //   } catch (error) {
  //     console.error("Error in response handler:", error);
  //   }
  // // });

  await page.mouse.click(400, 567, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(Register form)
  // let username = generateVietnameseUsername();
  // let psw = generateSecurePassword();

  // await page.mouse.click(370, 230, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(username)
  // await page.keyboard.type(username, { delay: 100 }); // Nhập username vào input

  // await page.mouse.click(370, 270, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(psw)
  // await page.keyboard.type(psw, { delay: 100 }); // Nhập password vào input

  // await page.mouse.click(370, 320, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(re-psw)
  // await page.keyboard.type(psw, { delay: 100 }); // Nhập re-password vào input

  // await page.mouse.click(370, 370, { button: "left" });
  // await page.keyboard.type(captchaText, { delay: 100 }); // Nhập re-password vào input

  // // Di chuyển chuột đến tọa độ popup form đăng ký(captcha code)
  // await page.mouse.click(370, 410, { button: "left" }); // Di chuyển chuột đến tọa độ popup form đăng ký(btn confirm)

  // await page.mouse.click(520, 570, { button: "left" }); // Di chuyển chuột đến tọa độ mở popup login
  // await page.mouse.click(500, 250, { button: "left" }); // Di chuyển chuột đến tọa độ input username
  // await page.keyboard.type("admin123");
  // await page.mouse.click(500, 300, { button: "left" }); // Di chuyển chuột đến tọa độ mở input password
  // await page.keyboard.type("admin123");
  // await page.mouse.click(500, 350, { button: "left" }); // Di chuyển chuột đến tọa độ button login

  // async function signUpAutomation(page) {}
}

main();
