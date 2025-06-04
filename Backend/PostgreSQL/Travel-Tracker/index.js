import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "worldDB",
  password: "marta",
  port: 5432,
});

db.connect();

let countries = [];
let visitedCountries = [];

//TODO: Move this query to the post route so we query our visited countries and enter the data into the database
//BUG: Due to use db.end() below in this query, our other query in the post route returns an error
db.query("SELECT * FROM countries", (err, res) => {
  if (err) {
    console.log("Error exectuing query:", err.stack);
  } else {
    res.rows.forEach((country) => {
      var data = {
        Country: country.country_name.toLowerCase(),
        Code: country.country_code,
      };
      countries.push(data);
    });
    // console.log(countries);
  }

  db.end();
});

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    countries: visitedCountries,
    total: visitedCountries.length,
  });
});

app.post("/add", async (req, res) => {
  const userInput = req.body.country.toLowerCase();
  let resultCountryCode = "";

  countries.forEach((country) => {
    if (userInput === country.Country) {
      if (visitedCountries.includes(country.Code)) {
        console.log("Element Already Exists");
        return;
      } else {
        console.log("Adding:", country.Code);
      }

      resultCountryCode = country.Code;
      visitedCountries.push(country.Code);

      return;
    }
  });

  res.redirect("/");
  // res.render("index.ejs", {
  //   countries: visitedCountries,
  //   total: visitedCountries.length,
  // });
  //
  //BUG: Due to use db.end() below in this query, our other query in the post route returns an error
  // const result = await db.query(
  //   `INSERT INTO visited_countries
  //   (country_code)
  //   VALUES ($1)`,
  //   [resultCountryCode],
  // );
  //
  // console.log(result);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
