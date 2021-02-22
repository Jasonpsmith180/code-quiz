var startButton = document.getElementById('start');
var highScoreButton = document.getElementById('highScores');
var quizTimerEl = document.getElementById('timer');
var startContainerEl = document.getElementById('start-container');
var questionContainerEl = document.getElementById('question-container');
var endGameContainerEl = document.getElementById('end-game-container');
var highScoreContainerEl = document.getElementById('highscore-container');
var answerButtonEl = document.getElementById('answer-buttons');
var initialsEl = document.getElementById('initials');
var enterButton = document.getElementById('enter');
var randomQuestions;
var currentQuestion;
var time = 30;
var quizTimer;

// start timer that counts down from 3
function startCountdown() {
    var startCountdownEl = document.getElementById('startCountdown');
    var timeToStart = 3;

    // use setInterval() to decrement timeLeft by 1 every second
    var timeInterval = setInterval(function() {
        if (timeToStart > 1) {
            startCountdownEl.textContent = `The quiz starts in ${timeToStart} seconds!`;
            timeToStart--;
        }
        else if (timeToStart === 1) {
            startCountdownEl.textContent = `The quiz starts in ${timeToStart} second!`;
            timeToStart--;
        }
        else {
            startCountdownEl.textContent = "";
            clearInterval(timeInterval);
            console.log("Start")
            startQuiz();
        }
    }, 1000);
}

// function to start quiz
function startQuiz () {
    // hide start container and high scores button
    startContainerEl.classList.add('hide');
    highScoreButton.classList.add('hide');
    // show question container
    questionContainerEl.classList.remove('hide');
    // random sort questions array
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0;

    // start timer
    quizTimer = setInterval(timerTick, 1000);
    quizTimerEl.textContent = time;
    // show question
    nextQuestion();
}

function nextQuestion() {
    resetState();
    showQuestion(randomQuestions[currentQuestion]);
}

function showQuestion(question) {
    var questionEl = document.getElementById('question');
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.classList.add('answer-button')
        button.innerText = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener('click', selectAnswer);
        answerButtonEl.appendChild(button);
    });
}

function resetState() {
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    };
}

function selectAnswer(event) {
    var buttonClicked = event.target;
    var correct = buttonClicked.dataset.correct;
    setStatus(document.body, correct);
    Array.from(answerButtonEl.children).forEach(button => {
        setStatus(button, button.dataset.correct);
    });
    if (randomQuestions.length > currentQuestion + 1) {
        if (buttonClicked.dataset.correct === "false"){
            console.log("false");
            time -= 10;

            if (time < 0) {
                time = 0;
            }
        }
        else{
            console.log("true");
        }
        currentQuestion++;
        nextQuestion();
    }
    else {
        if (buttonClicked.dataset.correct === "false"){
            console.log("false");
        }
        else{
            console.log("true");
        }
        endGame();
    }
}



function setStatus(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add('correct');
    }
    else { 
        element.classList.add('incorrect');
        
    };
}

function clearStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function endGame() {
    clearInterval(quizTimer);

    questionContainerEl.classList.add('hide');
    endGameContainerEl.classList.remove('hide');

    var scoreEl = document.getElementById('score');
    scoreEl.textContent = time;
}

function timerTick() {
    time--;
    quizTimerEl.textContent = time;

    if (time <= 0) {
        endGame();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if(initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

        var newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
    highScores();
}

function getHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    console.log(highscores);
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var listItem = document.createElement("li");
        listItem.textContent = score.initials + " - " + score.score;

        var orderedListEl = document.getElementById('score-list');
        orderedListEl.appendChild(listItem);
    });
}

function highScores() {
    startContainerEl.classList.add('hide');
    endGameContainerEl.classList.add('hide');
    highScoreContainerEl.classList.remove('hide');
    getHighscores();
}

startButton.onclick = startCountdown;
highScoreButton.onclick = highScores;
enterButton.onclick = saveHighscore;

var questions = [
    {
        question: 'What does JS stand for?',
        answers: [
            { text: 'JavaScript', correct: "true" },
            { text: 'Flexbox', correct: "false"},
            { text: 'Cascading Spreadsheets', correct: "false" },
            { text: 'Jquery', correct: "false"}
    ]},
    {
        question: 'What tag denotes the start of a segment of JavaScript code',
        answers: [
            { text: '<js>', correct: "false" },
            { text: '<code>', correct: "false"},
            { text: '<script>', correct: "true" },
            { text: '<run>', correct: "false"}
    ]},
    {
        question: 'Which of these elements does Javascript NOT use?',
        answers: [
            { text: 'functions', correct: "false" },
            { text: 'boolean', correct: "false" },
            { text: 'array', correct: "false" },
            { text: 'div', correct: "true" }
    ]},
    {
        question: 'This is a random question?',
        answers: [
            { text: 'yes', correct: "false" },
            { text: 'no', correct: "false" },
            { text: 'no', correct: "false" },
            { text: 'of course', correct: "true" }
    ]}
]