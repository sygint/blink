import express from "express";
import bodyParser from "body-parser";
import Mercury from '@postlight/mercury-parser';

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/extract", (req, res) => {
  Mercury.parse(req.body.url).then(result => {
    res.send(result);
  });
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
