var gamePattern=[]
var userClickedPattern=[]
var buttonColours=["red", "blue", "green", "yellow"]
$(".btn").click(function(){
    var userChosenColour=this.id;
   
    userClickedPattern.push(userChosenColour)
    //  console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

var level=0;
var started=false;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong");
        var ok=$("body")
        ok.addClass("game-over");
        setTimeout(function(){
ok.removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
  
      }
}
function nextSequence(){
    userClickedPattern = [];
var randomNumber=Math.floor(4*Math.random());
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
level++;

$("#level-title").text("Level"+level);


$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    var header = $('#'+currentColour);
    header.addClass('pressed');
    setTimeout(function() {
        header.removeClass('pressed');
    }, 100);
}
function startOver(){
    level=0;
    started=0;
    gamePattern=[];
}

