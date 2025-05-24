import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h2>Contact Us</h2><p>Call Us: +44123123123</p>");
});

app.get("/about", (req, res) => {
  res.send("<h2>About Us</h2>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
