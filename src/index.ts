import dotenv from "dotenv";
import { BrowserManager } from "./controllers/browser";
import { delay } from "./utils/random";
import axios from "axios";
import { exportToExcel } from "./utils/excel";

dotenv.config();

async function main() {
  const browserManager = BrowserManager.getInstance();
  await browserManager.navigateTo("https://web.hit.club/");
  await delay(3000);
  await browserManager.clearData();
  const page = await browserManager.getCurrentPage();
  await page.reload();
  await delay(3000);

  await page.evaluate(() => {
    const cursor = document.createElement("div");
    cursor.id = "fake-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      top: "68%",
      left: "55%",
      width: "20px",
      height: "20px",
      background: "red",
      borderRadius: "50%",
      zIndex: 9999,
      pointerEvents: "none",
    });
    document.body.appendChild(cursor);
  });
  await delay(3000);
  const positionLogin = await page.evaluate(() => {
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      return {
        x: cursor.offsetLeft,
        y: cursor.offsetTop,
      };
    }
  });

  // click to login
  await page.mouse.click(positionLogin?.x || 0, positionLogin?.y || 0);
  await delay(500);

  await page.evaluate(() => {
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      cursor.style.top = "43%";
    }
  });

  const positionUserName = await page.evaluate(() => {
    // nhập đă
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      return {
        x: cursor.offsetLeft,
        y: cursor.offsetTop,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  });

  await page.mouse.click(positionUserName.x, positionUserName.y);
  await delay(500);
  const username = "loingo111";
  // keyboard control + a with mac and windows
  if (process.platform === "darwin") {
    await page.keyboard.press("Meta+A");
  } else {
    await page.keyboard.press("Control+A");
  }
  await page.keyboard.press("Backspace"); // xoá hết

  await page.keyboard.type(username, {
    delay: 100,
  });

  await delay(500);

  await page.evaluate(() => {
    // nhập đă
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      cursor.style.top = "55%";
    }
  });

  const password = await page.evaluate(() => {
    // nhập đă
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      return {
        x: cursor.offsetLeft,
        y: cursor.offsetTop,
      };
    }

    return {
      x: 0,
      y: 0,
    };
  });

  await page.mouse.click(password.x, password.y);
  await delay(500);
  const pw = "123@123a";
  await page.keyboard.type(pw, {
    delay: 300,
  });

  await delay(1000);

  await page.evaluate(() => {
    // nhập đă
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      cursor.style.top = "68%";
    }
  });

  const loginBtn = await page.evaluate(() => {
    // nhập đă
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      return {
        x: cursor.offsetLeft,
        y: cursor.offsetTop,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  });

  await page.mouse.click(loginBtn?.x || 0, loginBtn?.y || 0);

  await delay(3000);

  await page.evaluate(() => {
    // nhập đă
    const cursor = document.getElementById("fake-cursor");
    if (cursor) {
      cursor.style.bottom = "10%";
      cursor.style.top = "auto";
      cursor.style.left = "40%";
    }
  });

  await delay(3000);

  const sessionId = await page.evaluate(() => {
    return localStorage.getItem("hitsession_id");
  });

  const response = await axios.get(
    `https://pmbodergw.dsrcgoms.net/payment/banks/hit?xtoken=${sessionId}`
  );

  const jsonData = response.data;

  exportToExcel(jsonData);
  await browserManager.close();
}

main();
