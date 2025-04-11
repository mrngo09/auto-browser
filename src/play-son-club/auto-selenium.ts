import chrome from "selenium-webdriver/chrome";
import { Builder } from "selenium-webdriver";
import {
  generateSecurePassword,
  generateVietnameseUsername,
} from "../utils/generateString";
import { delay } from "../utils/random";
declare module "selenium-webdriver" {
  interface WebDriver {
    executeCdpCommand(command: string, params: object): Promise<object>;
  }
}

async function main() {
  const options = new chrome.Options();
  options.addArguments("--allow-geolocation");
  options.windowSize({ width: 814, height: 799 });
  //   options.addArguments("--auto-open-devtools-for-tabs");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.manage().deleteAllCookies();

    await driver.get("https://play.son.club");
    const action = driver.actions();

    const viewportSize: any = await driver.executeScript(
      "return { width: window.innerWidth, height: window.innerHeight };"
    );
    console.log("Inner viewport size:", viewportSize);
    await driver.wait(async () => {
      return (
        (await driver.executeScript("return document.readyState")) ===
        "complete"
      );
    }, 30000);
    console.log("Page loaded successfully.");
    await driver.sleep(5000); // Wait for the username field to be ready
    console.log("10s later...");

    await action.move({ x: 400, y: 565, duration: 100 }).click().perform();
    console.log("Clicked on the register button.Wait 5s");
    await driver.sleep(3000); // Wait for the username field to be ready

    let username = generateVietnameseUsername();
    let password = generateSecurePassword();
    console.log(`Username: ${username}, Password: ${password}`);

    await action.move({ x: 370, y: 230 }).click().perform(); //username
    console.log("Clicked on the username field");

    await action
      .sendKeys(username)
      .pause(50) // Small delay between keys
      .perform();

    // await action.move({ x: 370, y: 270, duration: 500 }).perform();
    // await action.click().perform(); //psw
    // for (const char of password) {
    //   await action.sendKeys(char).perform();
    //   await driver.sleep(1000);
    // }

    // await driver.sleep(5000); // Wait for the password field to be ready

    // await action.move({ x: 370, y: 320, duration: 200 }).perform();
    // await action.click().perform(); //re-psw
    // for (const char of password) {
    //   await action.sendKeys(char).perform();
    //   await driver.sleep(100);
    // }
    // await driver.sleep(1000); // Wait for the re-password field to be ready

    // await action.move({ x: 370, y: 370, duration: 200 }).perform();
    // await action.click().perform(); //captcha
    // for (const char of "captchaText") {
    //   await action.sendKeys(char).perform();
    //   await driver.sleep(100);
    // }
    // await driver.sleep(1000); // Wait for the captcha field to be ready

    // await action.move({ x: 400, y: 410 }).perform(); //register
    // await action.click().perform();
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await driver.sleep(5000); // Wait for a while before closing the browser
    await driver.quit();
  }
}

main();
