
function template() {
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

var initialMinutes = 25;
var initialSeconds = 0;
var minutes = initialMinutes;
var seconds = initialSeconds;
var click = new Audio("click.mp3");
var bell = new Audio("bell.mp3");
var timerInterval = {};
var isTimerRunning = false; 

document.addEventListener("DOMContentLoaded", function() {
    // Wait for the DOM content to be fully loaded

    // Get references to the play and pause buttons
    var playButton = document.getElementById("play");
    var pauseButton = document.getElementById("pause");

    // Add event listeners for the play and pause buttons
    playButton.addEventListener("click", start);
    pauseButton.addEventListener("click", pause);
});

function start() {
    if (isTimerRunning) { // If the timer is already running, exit the function
        return;
    }

    click.play();

    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Show GIFs and animate slide up
    document.querySelector(".left").classList.add("slide-up");
    document.querySelector(".right").classList.add("slide-up");

    // Show GIF containers
    document.querySelectorAll(".gif-container").forEach(container => {
        container.style.display = "inline-block";
    });


    timerInterval.minutes = setInterval(minutesTimer, 60000);
    timerInterval.seconds = setInterval(secondsTimer, 1000);
    isTimerRunning = true;

    function minutesTimer() {
        minutes = minutes - 1;
        document.getElementById("minutes").innerHTML = minutes;
    }

    function secondsTimer() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval.minutes);
                clearInterval(timerInterval.seconds);
                bell.play();
                isTimerRunning = false;
                return;
            }
            minutes -= 1;
            seconds = 59;
        } else {
            seconds -= 1;
        }
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
    }
}

function pause() {
    clearInterval(timerInterval.minutes);
    clearInterval(timerInterval.seconds);
    isTimerRunning = false;
}



document.getElementById("play").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);



function pause() {
    clearInterval(timerInterval.minutes);
    clearInterval(timerInterval.seconds);
    isTimerRunning = false;
}


document.getElementById("play").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
