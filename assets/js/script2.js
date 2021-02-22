var startButton = document.getElementById('start');
var highScoreButton = document.getElementById('highScores');
var quizTimerEl = document.getElementById('timer');
var startContainerEl = document.getElementById('start-container');
var questionContainerEl = document.getElementById('question-container');
var endGameContainerEl = document.getElementById('end-game-container');
var highScoreContainerEl = document.getElementById('highscore-container');
var answerButtonEl = document.getElementById('answer-buttons');
var scoreEl = document.getElementById('score');

var quizTime;
var randomQuestions;
var currentQuestionIndex = 0;


function startQuiz () {
    // hide start container and highscore button
    startContainerEl.classList.add('hide');
    highScoreButton.classList.add('hide');

    // show question container
    questionContainerEl.classList.remove('hide');
    
    // random sort the questions
    // randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0;

    nextQuestion();
}

function nextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var questionEl = document.getElementById('question');
    questionEl.innerText = currentQuestion.question;

    

    currentQuestion.choices.forEach(function(choice, i) {
        // create a button for each choice
        var button = document.createElement('button');
        // add attributes
        button.classList.add('answer-button')
        button.innerText = choice;
        // add event listners for each choice
        button.onclick = selectAnswer;
        // display button
        answerButtonEl.appendChild(button);
    });
}

function resetState() {
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    };
}

function selectAnswer() {
    if (this.value !== questions[currentQuestion].answer) {
        console.log("wrong")
    }
    else {
        console.log("right")
    }

    // move to next question
    currentQuestion++;

    if (currentQuestion === questions.length) {
        console.log("end");
        endGame();
    }
    else {
        console.log("next question");
        nextQuestion();
    }
}

function highScores() {
    startContainerEl.classList.add('hide');
    endGameContainerEl.classList.add('hide');
    highScoreContainerEl.classList.remove('hide');
}

function endGame() {
    questionContainerEl.classList.add('hide');
    endGameContainerEl.classList.remove('hide');
    // var score = timeLeft;
    // scoreEl.textContent = `${score}`;
}

startButton.onclick = startQuiz;
highScoreButton.onclick = highScores;

var questions = [
    {
        question: 'What does JS stand for?',
        choices: ['JavaScript','Flexbox','Cascading Spreadsheets','Jquery'],
        answer: 'JavaScript'
    },
    {
        question: 'What tag denotes the start of a segment of JavaScript code',
        choices: ['<js>','<code>','<script>','<run>'],
        answer: '<script>'
    },
    {
        question: 'Which of these elements does Javascript NOT use?',
        choices: ['functions','boolean','array','div'],
        answer: 'div'
    }
]