const puppeteer = require("puppeteer");

const saveToPdf = async (req) => {
  const url = req.query.url;

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto(url);

  const pdf = await page.pdf();
  await browser.close();

  return pdf;
};

module.exports = saveToPdf;
