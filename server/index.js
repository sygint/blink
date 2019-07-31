const express = require("express");
const asyncHandler = require('express-async-handler');
const bodyParser = require("body-parser");
const Mercury = require("@postlight/mercury-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/extract", asyncHandler(async (req, res) => {
  try {
    const bookmarkData = await Mercury.parse(req.body.url);
    
    res.send(bookmarkData);
  }
  catch(e) {
    console.trace(e);
  }
}));

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
