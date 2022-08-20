var gamePattern = [];  //Stores the sequence generated by nextSequence func

var buttonColours=["red","blue","green","yellow"];  //Button colours array to compare and identify buttons clicked

// Stores the pattern clicked by user.
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//This var indicates the level.
var level = 0;

//This works when we start playing game.
$("button").click(function(){
    $("button").hide();
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

// $(document).on("click", function(){
//     if (!started) {

//         //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//       }
// });


//Sequence Generator function
function nextSequence(){
        userClickedPattern = [];
    
        level++;
    
        $("#level-title").text("Level " + level);
    
        var randomNumber = Math.floor(Math.random()*4);
    
        var randomChosenColour = buttonColours[randomNumber];
    
        gamePattern.push(randomChosenColour);
    
        $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
        playSound(randomChosenColour);
    
       
    }

//Stores info about buttons clicked by user and stores them for further comparisons.
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
    // console.log(userClickedPattern);
});

//This func compares the user clicked sequence and generated patter by nextSequence
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("true");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        console.log("false"); 
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("h1").text("Game Over, Press  Restart" );
        startOver();
    }
}


//Plays sound on click and on Sequence generated by pc
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");  
    }, 100);
}


//Function to StartOver the Game.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("button").text("Restart");
    $("button").show();

    
}


