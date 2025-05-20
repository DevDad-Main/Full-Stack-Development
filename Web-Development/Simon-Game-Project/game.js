const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  return randomNumber;
}

function playSound(name) {
  var randomChosenAudio = new Audio(`./sounds/${name}.mp3`);
  randomChosenAudio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

var randomChosenColour = buttonColours[nextSequence()];

$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

$(".btn").click((event) => {
  var buttonId = event.target.id;
  gamePattern.push(buttonId);
  console.log(gamePattern);
  playSound(buttonId);
  animatePress(buttonId);
  // if (buttonId === randomChosenColour) {
  //   gamePattern.push(randomChosenColour);
  //   console.log(gamePattern);
  //   playSound(randomChosenColour);
  // }
});
