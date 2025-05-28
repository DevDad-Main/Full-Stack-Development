import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Olbol";
const yourPassword = "Sexy";
const yourAPIKey = "e0488743-cb9c-408d-a784-4d2499e7ceb1";
const yourBearerToken = "a35f1900-d028-496f-a35f-1b24c21daaef";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const result = response.data;
    var stringyData = JSON.stringify(result);
    res.render("index.ejs", { content: stringyData });
  } catch (error) {
    console.log("Failed to make request", error.message);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    var stringyData = JSON.stringify(result);
    res.render("index.ejs", { content: stringyData });
  } catch (error) {
    console.log("Failed to make request", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      API_URL + `filter?score=5&apiKey=${yourAPIKey}`,
    );

    const result = response.data;
    var stringyData = JSON.stringify(result);
    res.render("index.ejs", { content: stringyData });
  } catch (error) {
    console.log("Failed to make request", error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const result = response.data;
    var stringyData = JSON.stringify(result);
    res.render("index.ejs", { content: stringyData });
  } catch (error) {
    console.log("Failed to make a request", error.message);
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
