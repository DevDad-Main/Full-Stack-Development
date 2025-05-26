import express from "express";

const app = express();
const port = 3000;
const url = "https://api.wheretheiss.at/v1/satellites/25544";

var issData = fetch(url).then((data) => data.json());

app.get("/", async (req, res) => {
  try {
    const response = await fetch(url);
    const issData = await response.json();

    // This here is called Object Destructuring,
    // It assigns those variables with the data from issData,
    // But its case sensitive and the names have to match exactly
    // Essentially short hand for the below
    // const latitude = issData.latitude
    // const longitude = issData.longitude
    const { latitude, longitude, name } = issData;

    res.send(
      `<h1>Satellite: ${name.toUpperCase()}</h1> <h2>Latitude: ${latitude}</h2> <h2>Longitude: ${longitude}</h2>`,
    );
  } catch (error) {
    console.error("Error fetching ISS data:", error);
    res.status(500).send("Failed to fetch ISS location.");
  }
});

// app.post("/", (req, res) => {
//   res.send("<h2>`Latitude: ${lat}`</h2>, <h2>`Longitude ${long}`</h2>");
// });

app.listen(port, () => {
  console.log("Server is listening on:", port);
});
