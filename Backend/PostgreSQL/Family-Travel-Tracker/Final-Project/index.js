import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "worldDB",
  password: "marta",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

//NOTE: Querying DB for Users and placing them into an object then into a list for us to access
async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  // console.log(result.rows);
  let users = [];
  let data = {};
  result.rows.forEach((user) => {
    data = {
      id: user.id,
      name: user.name,
      color: user.color,
    };
    users.push(data);
  });
  return users;
}

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id=$1",
    [currentUserId],
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

function getCurrentUserColour(users) {
  //NOTE: Fallback
  let colour = "white";

  users.forEach((user) => {
    if (currentUserId === user.id) return (colour = user.color);
  });

  return colour;
}

app.get("/", async (req, res) => {
  try {
    const countries = await checkVisisted();
    const users = await getUsers();

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: getCurrentUserColour(users),
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});

app.post("/add", async (req, res) => {
  const input = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()],
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId],
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  const isNumeric = (string) => string == Number.parseFloat(string);

  if (isNumeric(req.body.user)) {
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  } else if (req.body.add === "new") {
    console.log(" We should now create a new family member");
    // res.redirect("/new");
    res.render("new.ejs");
  }
  //NOTE: Debugging the user id that gets passed through the body parser
  console.log(req.body);
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  //NOTE: We Render the page so the user can see all the details
  res.render("new.ejs");
  //NOTE: Simple Debugging
  console.log(req.body);

  try {
    const newUser = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2)",
      [req.body.name, req.body.color],
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
