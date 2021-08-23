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
var timeInterval; // global so we can stop it when we click view highscore in a quiz

var initials = document.querySelector("#initials");
var questionEl = document.querySelector("#question");
var option1El = document.querySelector("#option1");
var option2El = document.querySelector("#option2");
var option3El = document.querySelector("#option3");
var option4El = document.querySelector("#option4");
var highscoresEl = document.querySelector("#highscores");

const questions = [
    {
        question: "What is ++ operator?",
        options: ["Addition", "Increment", "Exponentiation", "Decrement"],
        correctAnswer: "Increment"
    },
    {
        question: "What is === operator?",
        options: ["Equal to", "Assignment", "Equal value and equal type", "Ternary"],
        correctAnswer: "Equal value and equal type"
    },
    {
        question: "What is ** operator?",
        options: ["Exponentiation", "Multiplication", "Double Multiplication", "Modulus"],
        correctAnswer: "Exponentiation"
    },
    {
        question: "What is -- operator?",
        options: ["Exponentiation", "Double Subtraction", "Subtraction", "Decrement"],
        correctAnswer: "Decrement"
    },
    {
        question: "What is ? operator?",
        options: ["Question", "Ternary", "Not equal", "Modulus"],
        correctAnswer: "Ternary"
    },
    {
        question: "What is == operator?",
        options: ["Equal to", "Equal value and equal type", "Assignment", "Concatenation"],
        correctAnswer: "Equal to"
    },
    {
        question: "What is % operator?",
        options: ["Division", "Not equal", "Modulus", "Concatenation"],
        correctAnswer: "Modulus"
    }
]

var questionNumber = 0;
var score = 0;

function showQuestion() {
    if (questionNumber < questions.length) {
        questionEl.textContent = questions[questionNumber].question;
        option1El.value = questions[questionNumber].options[0];
        option2El.value = questions[questionNumber].options[1];
        option3El.value = questions[questionNumber].options[2];
        option4El.value = questions[questionNumber].options[3];
    }
}

function showHighscore() {
    // removes all scores before we load in the ones stored in localStorage
    while (highscoresEl.firstChild) {
        highscoresEl.removeChild(highscoresEl.firstChild);
    }

    // gets the userScores from the localStorage
    var scores = JSON.parse(localStorage.getItem("userScores"));

    // sort the scores before we add them as children 
    scores.sort((a, b) => {
        return b.score - a.score;
    })
    console.log(scores);

    // loops through all the scores and addes them as children under an ordered list
    for (let i = 0; i < scores.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = scores[i].initials + " - " + scores[i].score;
        highscoresEl.appendChild(liEl);
    }
}

option1El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option1El.value == questions[questionNumber].correctAnswer) {
        questionNumber++;
        showQuestion();
    }
    else {
        timeLeft = timeLeft - 10;
    }
});

option2El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option2El.value === questions[questionNumber].correctAnswer) {
        questionNumber++;
        showQuestion();
    }
    else {
        timeLeft = timeLeft - 10;
    }
});

option3El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option3El.value === questions[questionNumber].correctAnswer) {
        questionNumber++;
        showQuestion();
    }
    else {
        timeLeft = timeLeft - 10;
    }
});

option4El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option4El.value === questions[questionNumber].correctAnswer) {
        questionNumber++;
        showQuestion();
    }
    else {
        timeLeft = timeLeft - 10;
    }
});

function startQuiz() {
    questionNumber = 0;
    timeLeft = 75;
    score = 0;
    
    showQuestion();

    timeInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0 || questionNumber >= questions.length) {
            clearInterval(timeInterval);
            timeEl.textContent = "";
            questionScren.style.display = "none";
            endScreen.style.display = "block";
            score = timeLeft + 1;
        }
    }, 1000);
}

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    startScreen.style.display = "none";
    questionScren.style.display = "block";
    startQuiz();
});

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    var userScore = {
        initials: initials.value,
        score: score
    }

    var userScores = JSON.parse(localStorage.getItem("userScores")) || [];
    userScores.push(userScore);

    localStorage.setItem("userScores", JSON.stringify(userScores));
    endScreen.style.display = "none";
    highscoreScreen.style.display = "block";

    showHighscore();
});

goBackButton.addEventListener("click", function (event) {
    event.preventDefault();
    highscoreScreen.style.display = "none";
    startScreen.style.display = "block";
})

viewHighscore.addEventListener("click", function (event) {
    event.preventDefault();
    startScreen.style.display = "none";
    questionScren.style.display = "none";
    endScreen.style.display = "none";
    highscoreScreen.style.display = "block";
    clearInterval(timeInterval);
    timeEl.textContent = "";
    showHighscore();
});



