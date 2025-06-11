import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//NOTE: Express-session middleware
app.use(
  session({
    secret: "TOPSECRET",
    resave: false,
    saveUninitialized: true,
    //NOTE: Defines the life time of the cookie
    //NOTE: So we can expire the session after a certain amount of time
    cookie: {
      // 1000ms * 60 (1 Min) * 60 (1 hour) * 24 (1 day)
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

//NOTE: Passport session MUST BE DEFINED
//      AFTER Express-session
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123456",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  //NOTE: How to tell if the user is already logged in?
  //NOTE: IF we already have an active session active in a cookie
  //NOTE: Then we can straight away show them that page.
  //NOTE: OTHERWISE if we don't then we dont show it to them

  //NOTE: the user varible gets passed from the passport callback
  //NOTE: This contains the information we saved into the user variable in the passport verify strategy
  console.log(req.user);

  // This comes from passport, it gets saved when we make a request
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash],
          );
          const user = result.rows[0];

          //NOTE: Calling this will automatically authenticate our user
          //NOTE: With the user details that we return from the db Query
          res.login(user, (err) => {
            console.log(err);
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//NOTE: Instead of using an sync func with request and response, we will instead use passport as the middleware
//NOTE:
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  }),
);

//NOTE: In passport lingo, cb = Callback
passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              //NOTE: In "/secrets" get route, the Callback
              //NOTE: Will send over the false value for the user
              //NOTE: Thus not allowing our user to be Authenticated
              return cb(null, false);
            }
          }
        });
      } else {
        //NOTE: Returns the error below
        return cb("User not found");
      }
    } catch (err) {
      return cb(err);
    }
  }),
);

//NOTE: Here we serialize or save the user that was logged in
// TO Local storage
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
