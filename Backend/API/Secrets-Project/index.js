// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
// 2. Create an express app and set the port number.

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

// 3. Use the public folder for static files.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("views"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const result = response.data;
    console.log(result);
    // var stringyData = JSON.stringify(result);
    res.render("index.ejs", {
      secret: result.secret,
      user: result.username,
    });
  } catch (error) {
    console.log("Failed to make request:", error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log("Server is listening on: ", port);
});
