let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
var started = false;



// trigger next sequence -----------------

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSounds(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);


}

// button clicks ----------------


$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSounds(userChosenColor);
    animatePress(userChosenColor);
    checkAnswers(userClickedPattern.length - 1);

});

// Play's sound -------------

function playSounds(name) {
    let color = new Audio("sounds/" + name + ".mp3");
    color.play();
}


// button animations -------------


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);

}


//Compare User and Game sequence for all indices. CurrentLevel = index


function checkAnswers(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (currentLevel === gamePattern.length - 1) {
            setTimeout(() => {
                userClickedPattern.length = 0;
                nextSequence();
            }, 1000)
        }
    }
    else {
        playSounds("wrong");
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game-over, Press A key to restart")
        startOver();
    }
}

//  Reset when game is over. Clear arrays

function startOver() {
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    level = 0;
    started = false;
}
// start the game on first keypress/keydownn only

$(document).keydown(() => {
    if (level === 0) {
        nextSequence();

    }
})

