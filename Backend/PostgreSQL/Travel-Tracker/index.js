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

let error;

// //TODO: Move this query to the post route so we query our visited countries and enter the data into the database
// //BUG: Due to use db.end() below in this query, our other query in the post route returns an error
// db.query("SELECT * FROM countries", (err, res) => {
//   if (err) {
//     console.log("Error exectuing query:", err.stack);
//   } else {
//     res.rows.forEach((country) => {
//       var data = {
//         Country: country.country_name.toLowerCase(),
//         Code: country.country_code,
//       };
//       countries.push(data);
//     });
//     // console.log(countries);
//   }
//   //FIX: Commenting this out due to closing the database here
//   // our query below in the post route couldn't get executed because of this
//   // db.end();
// });
//
async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];

  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    error: error,
  });
});

app.post("/add", async (req, res) => {
  const userInput = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code from countries WHERE country_name=$1",
      [userInput],
    );

    const data = result.rows[0];
    const countryCode = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode],
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
