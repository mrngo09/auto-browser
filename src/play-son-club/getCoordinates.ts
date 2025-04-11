import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

async function logMouseCoordinates(
  url: string,
  width: number = 814,
  height: number = 199
): Promise<void> {
  // Configure Chrome options (non-headless to see DevTools)
  const options = new chrome.Options();
  options.addArguments("--allow-geolocation");
  options.windowSize({ width: 814, height: 799 });

  // Initialize WebDriver
  const driver: WebDriver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  try {
    console.log(`Requested window size: width=${width}, height=${height}`);
    const action = driver.actions({ async: true });

    await driver.get(url);
    // await driver
    //   .manage()
    //   .window()
    //   .setRect({ width: width + 14, height: height + 199 });
    const viewportSize: any = await driver.executeScript(
      "return { width: window.innerWidth, height: window.innerHeight };"
    );
    console.log("Inner viewport size:", viewportSize);

    // Inject JavaScript to log mouse coordinates on mousemove
    const script = `
      document.addEventListener('mousemove', (event) => {
        console.log('Mouse coordinates: x=' + event.clientX + ', y=' + event.clientY);
      });
    `;
    await driver.executeScript(script);
    console.log("Injected mousemove event listener to log coordinates.");

    // Simulate mouse movements to trigger console logs
    const canvasExists = await driver.executeScript(`
        const canvas = document.querySelector("#GameCanvas") || 
                       document.querySelector("#GameCanvas.GameCanvas");
        return canvas !== null;
      `);
    console.log("Canvas exists:", canvasExists);

    if (!canvasExists) {
      console.log("No canvas found. Exiting.");
      return;
    }

    // Inject mousemove listener for canvas
    await driver.executeScript(`
        const canvas = document.querySelector("#GameCanvas") || 
                       document.querySelector("#GameCanvas.GameCanvas");
        if (canvas) {
          canvas.addEventListener("mousemove", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log("Tọa độ: x=" + x + ", y=" + y);
          });
        }
      `);
    console.log("Injected mousemove event listener to log canvas coordinates.");
    await driver.sleep(2000); // Adjust as needed
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Clean up
    await driver.quit();
  }
}

// Run the function with your website
logMouseCoordinates("https://play.son.club");
