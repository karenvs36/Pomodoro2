function template() {
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

//min and secs vars
var initialMinutes = 00;
var initialSeconds = 02;
var minutes = initialMinutes;
var seconds = initialSeconds;
var longBreakMinutes = 30; 
var longBreakSeconds = 0;
var breakMinutes = 00;
var breakSeconds = 02;


//other
var click = new Audio("click.mp3");
var bell = new Audio("bell.mp3");
var timerInterval = {};
var isTimerRunning = false;
var nyan = new Audio("nyan.mp3");

var pomodoroCounter = 0;

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

    template();

    timerInterval.minutes = setInterval(minutesTimer, 60000);
    timerInterval.seconds = setInterval(secondsTimer, 1000);
    isTimerRunning = true;
    // Show GIFs and animate slide up
    document.querySelector(".left").classList.add("slide-up");
    document.querySelector(".right").classList.add("slide-up");

    // Show GIF containers
    document.querySelectorAll(".gif-container").forEach(container => {
        container.style.display = "inline-block";
    });

    function minutesTimer() {
        minutes = minutes - 1;
        template();
    }

    function secondsTimer() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval.minutes);
                clearInterval(timerInterval.seconds);
                bell.play();
                isTimerRunning = false;
                startBreak(); // Start the break countdown
                return;
            }
            minutes -= 1;
            seconds = 59;
        } else {
            seconds -= 1;
        }
        template();
    }
}

function pause() {
    clearInterval(timerInterval.minutes);
    clearInterval(timerInterval.seconds);
    isTimerRunning = false;
}

document.getElementById("play").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);

//CODE FOR THE 5 MINUTE BREAK !!!!!!!!!♥ 


function startBreak() {
    if (pomodoroCounter < 4) {
        minutes = breakMinutes;
        seconds = breakSeconds;
        pomodoroCounter++; // Increment cycle count
    } else {
        minutes = longBreakMinutes;
        seconds = longBreakSeconds;
        pomodoroCounter = 0; // Reset cycle count after long break
    }
    isTimerRunning = true;
    // Remove judging cat gif 
    document.querySelectorAll(".gif-container").forEach(container => {
        container.style.display = "none";
    });

    nyan.play();
    // Show GIFs and animate slide up
    document.querySelector(".left").classList.add("slide-up");
    document.querySelector(".right").classList.add("slide-up");

    // Show GIF containers
    document.querySelectorAll(".gif-container-nyan").forEach(container => {
        container.style.display = "inline-block";
    });

    template();

    timerInterval.minutes = setInterval(minutesTimer, 60000);
    timerInterval.seconds = setInterval(secondsTimer, 1000);

    function minutesTimer() {
        minutes = minutes - 1;
        template();
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
        template();
    }
}
