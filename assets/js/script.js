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
var time = 60;
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
    // hide all containers and high scores button
    startContainerEl.classList.add('hide');
    highScoreButton.classList.add('hide');
    endGameContainerEl.classList.add('hide');
    highScoreContainerEl.classList.add('hide')
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

// function for next question
function nextQuestion() {
    // reset any existing questions before showing new question
    resetState();
    showQuestion(randomQuestions[currentQuestion]);
}

// function to show question
function showQuestion(question) {
    // get question element
    var questionEl = document.getElementById('question');
    // add attributes
    questionEl.innerText = question.question;
    // create answer buttons
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        // add attributes
        button.classList.add('answer-button')
        button.innerText = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener('click', selectAnswer);
        // send to page
        answerButtonEl.appendChild(button);
    });
}

// function to reset answer buttons
function resetState() {
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    };
}

// function to handle answer button clicks
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

// css elements to be added
function setStatus(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add('correct');
    }
    else { 
        element.classList.add('incorrect');
        
    };
}

// css elements to be removed
function clearStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// end game function
function endGame() {
    clearInterval(quizTimer);

    questionContainerEl.classList.add('hide');
    endGameContainerEl.classList.remove('hide');

    var scoreEl = document.getElementById('score');
    scoreEl.textContent = time;
}

// function to handle timer count
function timerTick() {
    time--;
    quizTimerEl.textContent = time;

    if (time <= 0) {
        endGame();
    }
}

// function to save highscore with user input
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

// function to get highscores from local storage
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

// function to show highscore container
function highScores() {
    startContainerEl.classList.add('hide');
    endGameContainerEl.classList.add('hide');
    highScoreContainerEl.classList.remove('hide');
    getHighscores();
}

startButton.onclick = startCountdown;
highScoreButton.onclick = highScores;
enterButton.onclick = saveHighscore;

// questions array
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
        question: 'Is this a gimme question?',
        answers: [
            { text: 'no', correct: "false" },
            { text: 'no', correct: "false" },
            { text: 'no', correct: "false" },
            { text: 'of course', correct: "true" }
    ]},
    {
        question: 'This is a useful debug tool to print content to see if code is working',
        answers: [
            { text: 'console.log', correct: "true" },
            { text: 'if statements', correct: "false" },
            { text: '.push', correct: "false" },
            { text: 'smashing your keyboard', correct: "false" }
    ]}
]