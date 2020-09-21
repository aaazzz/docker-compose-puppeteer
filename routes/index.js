const express = require("express");
const router = express.Router();
const captureHeatmap = require("../controller/captureHeatmap");
const saveToPdf = require("../controller/saveToPdf");

router.get("/", (_, res, __) => {
  res.send(
    `
      <a href="/screenshot/heatmap/sp?url=https://health-and-beauty.jp/?p=6396'">Click here to screenshot sample page!</a><br/>
      <a href="/export/pdf/sp?url=https://health-and-beauty.jp/?p=6396'">Click here to print sample page!</a>
    `
  );
});

router.get("/export/pdf/:device", async (req, res, next) => {
  try {
    let result = await saveToPdf(req.params.device, req);
    res.attachment(`sample.pdf`);
    res.contentType("application/pdf");
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/screenshot/heatmap/:device", async (req, res, next) => {
  try {
    const result = await captureHeatmap(req.params.device, req);
    res.contentType("text/html");
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
