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
// let users = [];
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

async function getCurrentUser(users) {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;

  return users.find((user) => user.id === currentUserId);
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

//NOTE: Instead made a new Function to get the
//NOTE: Current User from our users list and access the data directly
//NOTE: instead of this extra code
// function getCurrentUserColour(users) {
//   //NOTE: Default Value incase we get an error below, but shouldn't happen
//   let colour = "white";
//
//   users.forEach((user) => {
//     if (currentUserId === user.id) return (colour = user.color);
//   });
//
//   return colour;
// }

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await getUsers();
  const currentUser = await getCurrentUser(users);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
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
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  }
  //NOTE: Debugging the user id that gets passed through the body parser
  console.log(req.body);
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  //NOTE: We Render the page so the user can see all the details
  // res.render("new.ejs");
  //NOTE: Simple Debugging
  console.log(req.body);

  //NOTE: We use RETURNING * which will return us that new record or row we just added
  //NOTE: Then we can access the new users id and set it to the current one
  //NOTE: When we get redirected back to the homepage
  const newUser = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *",
    [req.body.name, req.body.color],
  );

  // Accessing that id from our newely created user and then set the currentUserId to it.
  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
