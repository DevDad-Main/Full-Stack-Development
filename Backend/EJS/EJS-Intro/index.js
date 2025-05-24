import express from "express";

const day = new Date();

const app = express();
const port = 3000;

function isWeekDay() {
  if (day.getDay() == 0 || day.getDay() == 1) {
    console.log("Weekened");
    return false;
  } else {
    console.log("Weekday");
    return true;
  }
}

app.get("/", (req, res) => {
  var dayToShow = isWeekDay() ? "a Weekday" : "a Weekend";
  var adviceToShow = isWeekDay()
    ? "it's time to work hard"
    : "it's time to relax";

  res.render("index.ejs", {
    dayType: dayToShow,
    advice: adviceToShow,
  });
});

app.post("/", (req, res) => {
  if (isWeekDay()) res.render("index.ejs", { weekday: req.body["weekday"] });
  else res.render("index.ejs", { weekday: req.body["weekend"] });
});

app.listen(port, () => {
  console.log("Server is runnin on: ", port);
});
