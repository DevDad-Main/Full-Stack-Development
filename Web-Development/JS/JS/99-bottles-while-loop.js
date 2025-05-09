const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

count = 99;

while (count >= 0) {
  console.log(
    count + " bottles of beer on the wall, " + count + "bottles of beer.",
  );
  console.log(
    "Take one down and pass it around," +
      count +
      " bottles of beer on the wall",
  );

  if (count === 1) {
    console.log(
      "\n" +
        count +
        " bottle of beer on the wall, " +
        count +
        " bottle of beer.",
    );
    console.log(
      "Take one down and pass it around," +
        count +
        " bottle of beer on the wall\n",
    );
  } else if (count === 0) {
    console.log("No more bottles of beer on the wall, no more bottles of beer");
    console.log(
      "Go to the store and buy some more, 99 bottles of beer on the wall",
    );
    break;
  }
  count--;
}
