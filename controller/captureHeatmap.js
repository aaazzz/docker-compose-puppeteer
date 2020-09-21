const puppeteer = require("puppeteer");

const getDeviceWidth = (device) => {
  switch(device) {
    case "sp":
      return 360;
    case "tablet":
      return 768;
    case "desktop":
      return 1024;

    return 0
  }
}

const captureHeatmap = async (req) => {
  const url = req.query.url;
  const deviceWidth = getDeviceWidth(req.query.device);
  if (!deviceWidth) {
    throw new Error("Unknown device parameter.");
  }

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: deviceWidth, height: 800 })
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
