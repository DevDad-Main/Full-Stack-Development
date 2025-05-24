import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Defining what type of data we will be passing through
app.use(bodyParser.urlencoded({ extended: true }));

// Using the dirname plugin we can dynamically find the path depending on what system we use
// So we if ever host to the cloud then it will still be able to figure out dynamically
// the file path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
