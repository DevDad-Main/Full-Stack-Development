function rollDice() {
  const randomNumber1 = Math.floor(Math.random() * 6) + 1;
  const randomNumber2 = Math.floor(Math.random() * 6) + 1;

  document
    .querySelectorAll("img")[0]
    .setAttribute("src", "images/dice" + randomNumber1 + ".png");
  document
    .querySelectorAll("img")[1]
    .setAttribute("src", "images/dice" + randomNumber2 + ".png");

  const heading = document.querySelector("h1");
  if (randomNumber1 > randomNumber2) {
    heading.textContent = "Player 1 Wins";
  } else if (randomNumber2 > randomNumber1) {
    heading.textContent = "Player 2 Wins";
  } else {
    heading.textContent = "Draw";
  }
}

// Roll once when page loads
rollDice();

// Re-roll on button click
document
  .querySelector("#rollButton")
  .addEventListener("click", rollDice);
