let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.querySelector('.status');
const modeToggleButton = document.getElementById('modeToggle');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    }
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            isWorkTime = !isWorkTime;
            timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
            statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
            new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
        }
    }, 1000);
    
    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    updateDisplay();
    statusText.textContent = 'Work Time';
    startButton.textContent = 'Start';
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay();
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    startButton.textContent = 'Start';
    modeToggleButton.textContent = isWorkTime ? 'Switch to Rest Mode' : 'Switch to Work Mode';
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(); 