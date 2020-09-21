const express = require("express");
const router = express.Router();
const captureHeatmap = require("../controller/captureHeatmap");
const saveToPdf = require("../controller/saveToPdf");

router.get("/", (_, res, __) => {
  res.send(
    `
      <a href="/screenshot/heatmap?url=https://health-and-beauty.jp/?p=6396'">Click here to screenshot sample page!</a><br/>
      <a href="/generate/pdf?url=https://health-and-beauty.jp/?p=6396'">Click here to print sample page!</a>
    `
  );
});

router.get("/generate/pdf", async (req, res, next) => {
  try {
    let result = await saveToPdf(req);
    res.attachment(`sample.pdf`);
    res.contentType("application/pdf");
    res.send(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/screenshot/heatmap", async (req, res, next) => {
  try {
    const result = await captureHeatmap(req);
    res.contentType("text/html");
    res.send(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
