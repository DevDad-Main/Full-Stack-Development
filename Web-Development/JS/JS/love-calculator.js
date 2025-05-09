const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask for the user's name
readline.question("What is your name? ", (firstName) => {
  readline.question("What is your crush's name? ", (crushName) => {
    var lovePercent = Math.floor(Math.random() * 100) + 1;

    if (lovePercent > 70) {
      console.log("You're a perfect match!", lovePercent + "%");
    } else if (lovePercent > 30 && lovePercent <= 70) {
      console.log("Your love score is", lovePercent, "%");
    } else if (lovePercent <= 30) {
      console.log(
        "Your love score is",
        lovePercent,
        "%" + "You go together like oil and water..",
      );
    }

    // Close the interface when done
    readline.close();
  });
});
// // Ask for the user's name
// var firstName = readline.question("What is your name? ");
// var curshName = readline.question("What is your crush's name?");
