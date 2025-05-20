const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  $(document).on("keypress", (event) => {
    if (event.key === "a") {
      $("#level-title").text(`Level: ${level}`);
      level++;
    }
  });

  return buttonColours[randomNumber];
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

$(`#${nextSequence()}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

$(".btn").click((event) => {
  var buttonId = event.target.id;

  if (buttonId === nextSequence()) {
    gamePattern.push(nextSequence());
    console.log(gamePattern);
    playSound(nextSequence());
    animatePress(buttonId);
  }
});

nextSequence();
