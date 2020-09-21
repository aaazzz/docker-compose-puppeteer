const puppeteer = require("puppeteer");
const { getViewPortOption, launchOptions } = require("../utils/helpers")

const saveToPdf = async (device, req) => {
  const url = req.query.url;
  const viewPortOption = getViewPortOption(device);
  if (!viewPortOption) {
    throw new Error("Unknown device parameter.");
  }

  const browser = await puppeteer.launch(launchOptions());

  const page = await browser.newPage();
  await page.setViewport(viewPortOption)

  await page.goto(url);

  const pdf = await page.pdf();
  await browser.close();

  return pdf;
};

module.exports = saveToPdf;
