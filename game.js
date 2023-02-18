
//game button color in the arry.
var buttonColours = ["red", "blue", "green", "yellow"];

// arry for add the randome colour.
var gamePattern = [];

//user clicked the colour button its stored in arry.//detact the button.

var userClickedPattern = [];
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    

});

//genrating the randome number for get the rendome colour form the arry and adding this colour to the new arry.
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

// playing the sound wen the user click and rendome colour comes.
function playSound(tileColour) {
    var audio = new Audio("sounds/" + tileColour + ".mp3");
    audio.play();
}

// user click to colour tile and new shade come with the class and remove in 100 ms.
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// game start key detaction and changing the level.
var started = false;
var level = 0;

$(document).keydown(function(){

    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }

    }

    else{
        var wronga = new Audio("sounds/"+"wrong.mp3");
        wronga.play();
        $("body").addClass("game-over");
        setTimeout(() => {
         $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}








