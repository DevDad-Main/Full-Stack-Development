const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];

var level = 0;
var started = false;

$(document).keypress(() => {
  if (!started) {
    $("#level-title").text(`Level: ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click((event) => {
  var userChosenColour = event.target.id;
  userPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userPattern.length - 1);
});

function nextSequence() {
  userPattern = [];

  level++;
  $("#level-title").text(`Level: ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
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

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    console.log("Success");

    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
  }
}
