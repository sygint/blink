const express = require("express");
const asyncHandler = require("express-async-handler");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const Mercury = require("@postlight/mercury-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post(
  "/extract",
  asyncHandler(async (req, res) => {
    const { url } = req.body;

    try {
      const response = await fetch(url);
      const html = await response.text();
      const bookmarkData = await Mercury.parse(url, { html });

      res.send(bookmarkData);
    } catch (e) {
      console.trace(e);
    }
  })
);

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
