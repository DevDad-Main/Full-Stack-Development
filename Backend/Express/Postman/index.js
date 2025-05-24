import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World </h1>");
});

app.post("/register", (req, res) => {
  // Do something here with the data we receive from the form
  res.sendStatus(201);
});

app.put("/user/oliver", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/oliver", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/oliver", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
