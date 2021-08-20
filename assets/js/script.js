var startButton = document.querySelector("#start");
var submitButton = document.querySelector("#submit");
var goBackButton = document.querySelector("#go-back");
var clearButton = document.querySelector("#clear-highscore");
var viewHighscore = document.querySelector("#view-highscore");

var startScreen = document.querySelector("#start-screen");
var questionScren = document.querySelector("#question-screen");
var endScreen = document.querySelector("#end-screen");
var highscoreScreen = document.querySelector("#highscore-screen");

var timeEl = document.querySelector("#time");
var timeLeft = 75;

function countdown() {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timeEl.textContent = "";
            questionScren.style.display = "none";
            endScreen.style.display = "block";
        }
    }, 1000);
}

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    startScreen.style.display = "none";
    questionScren.style.display = "block";
    countdown();
});

goBackButton.addEventListener("click", function(event) {
    event.preventDefault();
    highscoreScreen.style.display = "none";
    startScreen.style.display = "block";
})

viewHighscore.addEventListener("click", function(event) {
    event.preventDefault();
    startScreen.style.display = "none";
    questionScren.style.display = "none";
    endScreen.style.display = "none";
    highscoreScreen.style.display = "block";
});



