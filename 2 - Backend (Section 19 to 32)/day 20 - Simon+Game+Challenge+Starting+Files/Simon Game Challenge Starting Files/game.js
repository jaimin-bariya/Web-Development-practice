var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false;


$("#start-btn").on("click", function () {

    $(this).hide()

    if (!started) {

        setTimeout(() => {

            
            nextSequence()
        }, 500);

        started = true

    }
})




$(".btn").on("click", function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    // console.log(userClickedPattern)
    playSound(userChoosenColor)
    animateUserPress(userChoosenColor)
    
    checkAnswer(userClickedPattern.length-1)


})


function nextSequence() {
    // increase the level
    level++;

    // changing level title
    $("#level-title").text("Level " + level)

    // generate random color
    var randomNumber = Math.floor(Math.random() * (4) )
    var randomChosenColor = buttonColors[randomNumber];

    // save color in gamepattern array
    gamePattern.push(randomChosenColor);

    // playing sounds
    playSound(randomChosenColor)


    
}




function playSound(colorName) {
    $("#"+colorName).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50)
    let sound = new Audio("./sounds/"+colorName+".mp3")
    sound.play()
    
}



function animateUserPress(currentColor){
    $("#" + currentColor).addClass("pressed")

    setTimeout(function (){

        $("#" + currentColor).removeClass("pressed")
    }, 100)
}



function checkAnswer(currentLevel){



    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")

        if (userClickedPattern.length === gamePattern.length) {
            console.log("all sucess")


            setTimeout(function () {
                nextSequence()
                userClickedPattern.length = 0

            }, 1000)

        }

    }
    else {
        
        $("body").addClass("game-over")


        setTimeout(() => {
            $("body").removeClass("game-over")
            let soundGameOver = new Audio("./sounds/wrong.mp3")
            soundGameOver.play()
        }, 200);


        $("h1").text("Game Over, click on the button to start the game again")
        started = false;
        level = 0
        $("#start-btn").show();
        gamePattern.length = 0
        userClickedPattern.length = 0

        

    }


}











