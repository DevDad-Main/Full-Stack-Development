// This Uses the old common js way of getting packages
// const generateStupidName = require("sillyname");

// Then since Node v12 it now utilises importing like so
import generateStupidName from "sillyname";
var sillyName = generateStupidName();

console.log(`Hello, My name is: ${sillyName}`);

import { randomSuperhero } from "superheroes";
var superheroName = randomSuperhero();

console.log(`My Superhero Name is: ${superheroName}`);
