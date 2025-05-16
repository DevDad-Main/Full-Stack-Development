const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var names = ["Angela", "Ben", "Jenny", "Micahel", "Chloe"];

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function whosPaying(names) {
  var rName = Math.floor(Math.random() * names.length);

  return names[rName] + " is going to buy lunch today!";
}

console.log(whosPaying(names));

// var guessList = ["Olly", "Marta", "Alana", "Liam", "Theresa"];

// readline.question("What is your name? ", (nameToCheck) => {
//   if (guessList.includes(nameToCheck)) {
//     console.log("You're name is on the guess list, you may enter..");
//   } else {
//     console.log("You are not on the guess list, Please Leave!.");
//   }

//   readline.close();
// });
// var output = [];
// var count = 1;

// function fizzBuzz() {
//   if (count % 3 === 0 && count % 5 === 0) {
//     output.push("FizzBuzz");
//   } else if (count % 3 === 0) {
//     output.push("Fizz");
//   } else if (count % 5 === 0) {
//     output.push("Buzz");
//   } else {
//     output.push(count);
//   }
//   count++;
//   console.log(output);
// }

// fizzBuzz();
