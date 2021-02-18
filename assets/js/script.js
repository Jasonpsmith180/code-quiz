var startCountdownEl = document.getElementById('startCountdown');
var startButton = document.getElementById('start');
var highScoreButton = document.getElementById('highScores')

// start timer that counts down from 5
function startCountdown() {
    var timeLeft = 5;

    // use setInterval() to decrement timeLeft by 1 every second
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            startCountdownEl.textContent = `The quiz starts in ${timeLeft} seconds!`;
            timeLeft--;
        }
        else if (timeLeft === 1) {
            startCountdownEl.textContent = `The quiz starts in ${timeLeft} second!`;
            timeLeft--;
        }
        else {
            startCountdownEl.textContent = "";
            clearInterval(timeInterval);
            console.log("Start")
        }
    }, 1000);
}

function highScores() {
    console.log("High Scores");
}

startButton.onclick = startCountdown;
highScoreButton.onclick = highScores;