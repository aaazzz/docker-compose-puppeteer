const puppeteer = require("puppeteer");
const { getViewPortOption, launchOptions } = require("../utils/helpers")

const captureHeatmap = async (device, req) => {
  const url = req.query.url;
  const viewPortOption = getViewPortOption(device);
  if (!viewPortOption) {
    throw new Error("Unknown device parameter.");
  }

  const browser = await puppeteer.launch(launchOptions());

  const page = await browser.newPage();
  await page.setViewport(viewPortOption)
  await page.goto(url)

  const base64Image = await page.screenshot({
    type: "jpeg",
    encoding: "base64",
    fullPage: true,
    quality: 20
  });

  body = "data:image/jpeg;base64," + base64Image;
  await browser.close();

  return body;
};

module.exports = captureHeatmap;
