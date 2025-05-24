//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let isPasswordCorrect = false;
let correctPassword = "Marta";

function passwordCheck(req, res, next) {
  console.log(req.body);

  if (req.body.password === correctPassword) {
    console.log("Correct Password => Opening Secrets");
    isPasswordCorrect = true;
  } else {
    console.log("Wrong Password. Try Again");
    isPasswordCorrect = false;
  }

  next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (isPasswordCorrect) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // TODO: We can use res.redirect("/") instead of the below
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log("Server is runnig on port", port);
});
