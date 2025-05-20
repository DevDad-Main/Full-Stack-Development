const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  return randomNumber;
}

var randomChosenColour = buttonColours[nextSequence()];

gamePattern.push(randomChosenColour);

//#region
$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
var randomChosenAudio = new Audio(`./sounds/${randomChosenColour}.mp3`);
randomChosenAudio.play();
//#endregion

$(".btn").click((event) => {});
