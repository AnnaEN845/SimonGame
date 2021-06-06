let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern= [];
let started = false;
let level = 0;

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function (){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    // let audio = new Audio("sounds/wrong.mp3");
    // audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);

    startOver();
   }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("level "+level);
  // chose randomNumber and color
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // animate a flash to the button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // play color sound
  // let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  // audio.play();
  playSound(randomChosenColour);
}

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout (function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

}
function startOver(){
  let level = 0;
  let gamePattern = [];
  let started = false;
}
