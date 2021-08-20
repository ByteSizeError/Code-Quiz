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
var timeLeft = 75; //75

var initials = document.querySelector("#initials");

var questionEl = document.querySelector("#question");
var option1El = document.querySelector("#option1");
var option2El = document.querySelector("#option2");
var option3El = document.querySelector("#option3");
var option4El = document.querySelector("#option4");

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
    },
    {
        question: "const cars = [\"Toytota\", \"Ford\", \"Volkswagen\", \"BMW\"] <br> What is cars[1]?",
        options: ["Toyota", "Ford", "Volkwagen", "BMW"],
        correctAnswer: "Ford"
    },
    {
        question: "const cars = [\"Toytota\", \"Ford\", \"Volkswagen\", \"BMW\"] <br> What is cars[4]?",
        options: ["Toyota", "Ford", "undefined", "BMW"],
        correctAnswer: "undefined"
    },
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

option1El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option1El.value == questions[questionNumber].correctAnswer) {
        score++;
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
        score++;
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
        score++;
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
        score++;
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

    var timeInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0 || questionNumber >= questions.length) {
            clearInterval(timeInterval);
            timeEl.textContent = "";
            questionScren.style.display = "none";
            endScreen.style.display = "block";
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
        score: 0
    }

    localStorage.setItem("userScore", JSON.stringify(userScore));
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
});



