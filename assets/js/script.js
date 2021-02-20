var startButton = document.getElementById('start');
var highScoreButton = document.getElementById('highScores');
var quizTimerEl = document.getElementById('timer');
var startContainerEl = document.getElementById('start-container');
var questionContainerEl = document.getElementById('question-container');
var endGameContainerEl = document.getElementById('end-game-container');
var highScoreContainerEl = document.getElementById('highscore-container');
var answerButtonEl = document.getElementById('answer-buttons');
var scoreEl = document.getElementById('score');
var randomQuestions
var currentQuestion

// start timer that counts down from 5
function startCountdown() {
    var startCountdownEl = document.getElementById('startCountdown');
    var timeToStart = 1;

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
            quizTimer();
            startQuiz();
        }
    }, 1000);
}

function startQuiz () {
    startContainerEl.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    highScoreButton.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0;
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
    addEventListener('click', () => {
        if (randomQuestions.length > currentQuestion + 1) {
            currentQuestion++;
            nextQuestion();
        }
        else {
            addEventListener('click', () => {
                endGame();
            })
        }
    });
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

function quizTimer() {
    var timeLeft = 10;

    // use setInterval() to decrement timeLeft by 1 every second
    var timeInterval = setInterval(function() {
        if (timeLeft > -1) {
            quizTimerEl.textContent = `Time: ${timeLeft}`;
            timeLeft--;
        }
        else {
            clearInterval(timeInterval);
            endGame();
        };
    }, 1000);
}

function highScores() {
    startContainerEl.classList.add('hide');
    endGameContainerEl.classList.add('hide');
    highScoreContainerEl.classList.remove('hide');
}

function endGame() {
    questionContainerEl.classList.add('hide');
    endGameContainerEl.classList.remove('hide');
    scoreEl.textContent = `Score`;
}

startButton.onclick = startCountdown;
highScoreButton.onclick = highScores;

var questions = [
    {
        question: 'What does JS stand for?',
        answers: [
            { text: 'JavaScript', correct: true },
            { text: 'Flexbox', correct: false},
            { text: 'Cascading Spreadsheets', correct: false },
            { text: 'Jquery', correct: false}
    ]},
    {
        question: 'What tag denotes the start of a segment of JavaScript code',
        answers: [
            { text: '<js>', correct: false },
            { text: '<code>', correct: false},
            { text: '<script>', correct: true },
            { text: '<run>', correct: false}
    ]},
    {
        question: 'Which of these elements does Javascript NOT use?',
        answers: [
            { text: 'functions', correct: false },
            { text: 'boolean', correct: false},
            { text: 'array', correct: false },
            { text: 'div', correct: true}
    ]}
]