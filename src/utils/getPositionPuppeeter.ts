import { Page } from "puppeteer";

export async function getPosition(page: Page) {
  const canvasExists = await page.evaluate(() => {
    const canvas =
      document.querySelector("#GameCanvas") ||
      document.querySelector("#GameCanvas.GameCanvas");
    return canvas !== null;
  });
  console.log("Canvas exists:", canvasExists);
  await page.evaluate(() => {
    const canvas = document.querySelector("#GameCanvas");
    if (canvas) {
      canvas.addEventListener("mousemove", (event: any) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log(`Tọa độ: x=${x}, y=${y}`);
      });
    }
  });
}
