const sessionLengthSelect = document.getElementById("session-length");
const breakLengthSelect = document.getElementById("break-length");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const beep = document.getElementById("beep");

let intervalId;
let isRunning = false;
let isSession = true;
let minutes = parseInt(sessionLengthSelect.value);
let seconds = 0;

// Update timer display
function updateTimerDisplay() {
  minutesDisplay.innerText = minutes < 10 ? "0" + minutes : minutes;
  secondsDisplay.innerText = seconds < 10 ? "0" + seconds : seconds;
}

// Start timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          // Switch to break or session
          if (isSession) {
            isSession = false;
            minutes = parseInt(breakLengthSelect.value);
            document.title = "Break Time!";
          } else {
            isSession = true;
            minutes = parseInt(sessionLengthSelect.value);
            document.title = "Work Time!";
          }
          // Play sound
          beep.currentTime = 0;
          beep.play();
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateTimerDisplay();
    }, 1000);
  }
}

// Stop timer
function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
  }
}

// Reset timer
function resetTimer() {
  stopTimer();
  isSession = true;
  minutes = parseInt(sessionLengthSelect.value);
  seconds = 0;
  updateTimerDisplay();
  document.title = "Pomodoro Timer";
}

// Event listeners
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
sessionLengthSelect.addEventListener("change", resetTimer);
breakLengthSelect.addEventListener("change", resetTimer);
