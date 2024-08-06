// your-script.js
const puppeteer = require("puppeteer");

(async () => {
  console.log("launched script");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );

  await page.goto("https://www.google.com/");
  const title = await page.title();
  console.log("Page title:", title);
  await browser.close();
})();
