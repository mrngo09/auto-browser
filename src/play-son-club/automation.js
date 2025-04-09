// import { Builder } from "selenium-webdriver";
// import chrome from "selenium-webdriver/chrome.js";

// (async () => {
//   // Set Chrome options
//   let options = new chrome.Options();
//   options.addArguments("--allow-geolocation");
//   options.addArguments("--auto-open-devtools-for-tabs");
//   options.windowSize({ width: 800, height: 600 });

//   // Initialize the WebDriver with Chrome options
//   let driver = await new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options) // Use setChromeOptions instead of Capabilities
//     .build();

//   try {
//     // Delete all cookies (equivalent to browser.deleteCookie())
//     await driver.manage().deleteAllCookies();
//     const initialSize = await driver.manage().window().getRect();
//     console.log("Initial viewport size:", initialSize);

//     // Option 2: Dynamically set viewport size after launch
//     const newWidth = 800; // Example: adjust as needed
//     const newHeight = 600; // Example: adjust as needed
//     await driver
//       .manage()
//       .window()
//       .setRect({ width: newWidth, height: newHeight });
//     console.log(`Viewport set to ${newWidth}x${newHeight}`);
//     // Log the start of scraping
//     console.log("Starting scraping https://play.son.club/...");

//     // Navigate to the site (equivalent to waitUntil: 'networkidle2')
//     await driver.get("https://play.son13.club/");
//     // Wait until the network is idle (custom implementation)
//     await driver.wait(async () => {
//       return await driver.executeScript(
//         `return document.readyState === 'complete'`
//       );
//     }, 10000); // Timeout after 10 seconds

//     const actions = driver.actions({ async: true });

//     await actions
//       .move({ x: 400, y: 567, duration: 100 }) // Move to (x, y) over 500ms
//       .click() // Perform a left-click
//       .perform();

//     let username = generateVietnameseUsername();
//     let psw = generateSecurePassword();

//     // Type the username into the input field
//     await actions
//       .move({ x: 370, y: 230, duration: 100 }) // Move to (x, y) over 500ms
//       .click() // Perform a left-click
//       .perform();
//     await driver.sleep(1000); // Wait for 1 second before typing
//     await driver.actions().sendKeys(username).perform();

//     // Type the password into the input field
//     await actions
//       .move({ x: 370, y: 270, duration: 100 }) // Move to (x, y) over 500ms
//       .click() // Perform a left-click
//       .perform();
//     await driver.sleep(1000); // Wait for 1 second before typing
//     await driver.actions().sendKeys(psw).perform();

//     // // Click on the "Register" button (coordinates may need adjustment)
//     // await actions
//     //   .move({ x: 370, y: 300, duration: 100 }) // Move to (x, y) over 500ms
//     //   .click() // Perform a left-click
//     //   .perform();
//   } finally {
//     // Uncomment the line below to close the browser when done
//     // await driver.quit();
//   }
// })();
