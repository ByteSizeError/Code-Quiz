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

var tableEl = document.querySelector("#highscore-table")
var initials = document.querySelector("#initials");
var finalScoreEl = document.querySelector("#final-score")

var questionEl = document.querySelector("#question");
var option1El = document.querySelector("#option1");
var option2El = document.querySelector("#option2");
var option3El = document.querySelector("#option3");
var option4El = document.querySelector("#option4");

var hrEl = document.querySelector("#hr-line");
var feedbackEl = document.querySelector("#feedback");

var questionNumber = 0;
var score = 0;


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
    while (tableEl.firstChild) {
        tableEl.removeChild(tableEl.firstChild);
    }

    // gets the userScores from the localStorage
    var scores = JSON.parse(localStorage.getItem("userScores"));


    if (scores !== null) {
        // sort the scores before we add them as children 
        scores.sort((a, b) => {
            return b.score - a.score;
        })
        console.log(scores);

        // loops through all the scores and addes them as children under an ordered list
        for (let i = 0; i < scores.length; i++) {
            var trEl = document.createElement("tr");
            var td1El = document.createElement("td");
            var td2El = document.createElement("td");
            var td3El = document.createElement("td");

            td1El.textContent = (i + 1) + ".";
            td2El.textContent = scores[i].initials;
            td3El.textContent = scores[i].score;

            trEl.append(td1El, td2El, td3El);

            tableEl.append(trEl);
        }
    }
}

function clearResponse() {
    feedbackEl.textContent = "";
    hrEl.style.visibility = "hidden";
}

function correctResponse() {
    hrEl.style.visibility = "visible";
    feedbackEl.textContent = "correct";
    setTimeout(clearResponse, 500);
    questionNumber++;
    showQuestion();
}

function wrongResponse() {
    timeLeft = timeLeft - 10;
    hrEl.style.visibility = "visible";
    feedbackEl.textContent = "wrong";
    setTimeout(clearResponse, 500);
}

option1El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option1El.value == questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

option2El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option2El.value === questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

option3El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option3El.value === questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

option4El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option4El.value === questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

function gameOver() {
    timeEl.textContent = "";
    questionScren.style.display = "none";
    score = timeLeft + 1;
    endScreen.style.display = "flex";
    finalScoreEl.textContent = "Your final score is: " + score;
}

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
            gameOver();
        }
    }, 1000);
}

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    startScreen.style.display = "none";
    questionScren.style.display = "flex";
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
    highscoreScreen.style.display = "flex";

    showHighscore();
});

goBackButton.addEventListener("click", function (event) {
    event.preventDefault();
    highscoreScreen.style.display = "none";
    startScreen.style.display = "flex";
    timeEl.textContent = "Time: 75"
})

viewHighscore.addEventListener("click", function (event) {
    event.preventDefault();
    startScreen.style.display = "none";
    questionScren.style.display = "none";
    endScreen.style.display = "none";
    highscoreScreen.style.display = "flex";

    clearInterval(timeInterval);
    timeEl.textContent = "";

    showHighscore();
});

clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    showHighscore();
})

function startUp() {
    startScreen.style.display = "flex";
    questionScren.style.display = "none";
    endScreen.style.display = "none";
    highscoreScreen.style.display = "none";
    hrEl.style.visibility = "hidden";
};

