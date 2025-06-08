import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    //NOTE: Checking to see if the email already exists, if it does then then the
    //NOTE: String or Result wont be empty
    if (checkResult.rows.length > 0) {
      res.send("Email already exists, Please try again.");
    } else {
      const result = await db.query(
        "INSERT INTO users (email, password) values ($1, $2);",
        [email, password],
      );

      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      const passwordToCheck = checkResult.rows[0].password;

      if (passwordToCheck !== password) {
        res.send(
          "Unfortuantely you have entered the wrong password, Please Try again.",
        );
      } else {
        res.send("You have entered the correct password, Please Proceed.");
      }
    } else {
      res.send("User Not Found.");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
