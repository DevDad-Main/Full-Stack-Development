import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //We send the file for EJS to render the html file
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  var passedInName = (req.body.fName + req.body.lName).length;
  console.log(passedInName);
  res.render("index.ejs", { numOfLetters: passedInName });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
