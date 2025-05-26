import express from "express";

const app = express();
const port = 3000;

const url = "https://bored-api.appbrewery.com/random";

var randomActivity = fetch(url).then((data) => data.json());

async function fetchRandomActivity() {
  try {
    const response = await fetch(url);
    const randomActivity = await response.json();
    console.log(randomActivity);
    return randomActivity;
  } catch (error) {
    console.log("Error fetching Bored-api:", randomActivity);
    return null;
  }
}

console.log(fetchRandomActivity());
