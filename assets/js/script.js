// all the buttons found in the html
var startButton = document.querySelector("#start"); // button from start screen to start the quiz
var submitButton = document.querySelector("#submit"); // button from the end screen to submit score 
var goBackButton = document.querySelector("#go-back"); // button from the highscore screen to go back to start screen
var clearButton = document.querySelector("#clear-highscore"); // button from the high score screen to clear the highscores
var viewHighscore = document.querySelector("#view-highscore"); // button on the nav bar that is always present used to go to highscore page

// all the different screens in the html
var startScreen = document.querySelector("#start-screen"); // this is the start screen which greets the users
var questionScren = document.querySelector("#question-screen"); // question screen presents the user with questions
var endScreen = document.querySelector("#end-screen"); // when the user has finished the quiz and submits their initials
var highscoreScreen = document.querySelector("#highscore-screen"); // highscore screen presents all scores from past quizzes

// variables in charge of the time 
var timeEl = document.querySelector("#time"); // this element is the time in the top right corner 
var timeLeft = 75; // users time left for the quiz, this is also their score at the end
var timeInterval; // global so we can stop it when we click view highscore in a quiz

// elements in the highscore screen
var tableEl = document.querySelector("#highscore-table") // this is the highscore table that displays all previous user scores

// elements in the end screen
var initials = document.querySelector("#initials"); // input form for the user to put their initials for their score
var finalScoreEl = document.querySelector("#final-score") // displays users final score on the end page

// elements in the questions page
var questionEl = document.querySelector("#question"); // displays the question for the user 
var option1El = document.querySelector("#option1"); // first option in the question
var option2El = document.querySelector("#option2"); // second option in the question
var option3El = document.querySelector("#option3"); // third option for the question
var option4El = document.querySelector("#option4"); // fourth option for the question

// feedback for the questions page
var hrEl = document.querySelector("#hr-line"); // line under the options to let the user know if they got the answer right or wrong
var feedbackEl = document.querySelector("#feedback"); // feedback for the user telling them correct or wrong

// tracks the users progess and score
var questionNumber = 0; // used to keep track of which question we are on
var score = 0; // used to store the users score and resets after each game

// list of question for the user to answer
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

// each time the user finishes a question this function would be called and new question will be displayed
function showQuestion() {
    if (questionNumber < questions.length) {
        questionEl.textContent = questions[questionNumber].question;
        option1El.value = questions[questionNumber].options[0];
        option2El.value = questions[questionNumber].options[1];
        option3El.value = questions[questionNumber].options[2];
        option4El.value = questions[questionNumber].options[3];
    }
}

// this function is used to display the highscore when the user goes to the highscore screen
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

        // loops through all the score and creates a table row then appends it into the table
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

// this clears the feedback to the user
function clearResponse() {
    feedbackEl.textContent = "";
    hrEl.style.visibility = "hidden";
}

// feedback if the user response was correct
function correctResponse() {
    hrEl.style.visibility = "visible";
    feedbackEl.textContent = "correct";
    setTimeout(clearResponse, 500);
    questionNumber++;
    showQuestion();
}

// feedback for when the user response was incorrect
function wrongResponse() {
    timeLeft = timeLeft - 10;
    hrEl.style.visibility = "visible";
    feedbackEl.textContent = "wrong";
    setTimeout(clearResponse, 500);
}

// event listener for option 1
option1El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option1El.value == questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

// event listener for option 2
option2El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option2El.value === questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

// event listener for option 3
option3El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option3El.value === questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

// event listener for option 4
option4El.addEventListener("click", function (event) {
    event.preventDefault();
    if (option4El.value === questions[questionNumber].correctAnswer) {
        correctResponse();
    }
    else {
        wrongResponse();
    }
});

// this takes care of everything when the game ends, shows the end screen and displays the user score
function gameOver() {
    timeEl.textContent = "";
    questionScren.style.display = "none";
    score = timeLeft + 1; // we add the second back since the transition to the next screen takes 1 second
    endScreen.style.display = "flex";
    finalScoreEl.textContent = "Your final score is: " + score;
}

// this function takes care of everything when the users starts the quiz this calls the first showQuestion
function startQuiz() {
    questionNumber = 0;
    timeLeft = 75;
    score = 0;

    showQuestion();

    // time is decremented every second
    timeInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        // when the time runs out or we are out of questions the game stops
        if (timeLeft <= 0 || questionNumber >= questions.length) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}

// event listener for the start button
startButton.addEventListener("click", function (event) {
    event.preventDefault();

    startScreen.style.display = "none";
    questionScren.style.display = "flex";

    startQuiz();
});

// event listener for the submit button
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

// event listener for go back
goBackButton.addEventListener("click", function (event) {
    event.preventDefault();

    highscoreScreen.style.display = "none";
    startScreen.style.display = "flex";
    timeEl.textContent = "Time: 75"
})

// event listener for view highscore
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

// event listener for clear 
clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    
    localStorage.clear();
    showHighscore();
})

// this function is called when the page is first loaded
function startUp() {
    startScreen.style.display = "flex";
    questionScren.style.display = "none";
    endScreen.style.display = "none";
    highscoreScreen.style.display = "none";
    hrEl.style.visibility = "hidden";
};

