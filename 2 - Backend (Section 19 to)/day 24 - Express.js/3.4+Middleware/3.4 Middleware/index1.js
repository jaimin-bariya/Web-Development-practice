import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  console.log(req.body);
  var data = req.body;
  var brandName = `${data["street"]} ${data.pet}`;
  res.send(brandName);
});

app.get("/", (req, res) => {
  console.log(__dirname);
  console.log(fileURLToPath(import.meta.url));
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
