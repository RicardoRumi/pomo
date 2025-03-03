
let timeLeft = 30 * 60; 
let timerId = null;
let isRunning = false;
let startTime = null;
let targetEndTime = null;
let willBeepEvery30Seconds = false;

setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight);
}, 100);

setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('hours-only').textContent = hours;
    document.getElementById('minutes-display').textContent = mins;
}, 1000);

updateDisplay();

document.body.removeAttribute('onclick');
document.body.addEventListener('click', handleClick);

function handleClick(event) {
    const middleOfScreen = window.innerHeight / 2;
    
    if (event.clientY < middleOfScreen) {
        if (!isRunning) {
            start15MinTimer();
        }
    } else {
        if (!isRunning) {  
            start30MinTimer();
        }
        
    }
}

function start15MinTimer() {
    if (isRunning) return;
    
    isRunning = true;
    document.body.style.backgroundColor = "rgb(0, 112, 0)";
    timeLeft = 15 * 60;
    startTime = Date.now();
    targetEndTime = startTime + (timeLeft * 1000);
    
    timerId = setInterval(() => {
        const currentTime = Date.now();
        timeLeft = Math.ceil((targetEndTime - currentTime) / 1000);
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            resetTimer();
            return;
        }
        
        updateDisplay();
    }, 1000);
}

function start30MinTimer() {
    if (isRunning) return;
    
    isRunning = true;
    
    timeLeft = 30 * 60;
    startTime = Date.now();
    targetEndTime = startTime + (timeLeft * 1000);
    document.body.style.backgroundColor = "rgb(150, 0, 0)";
    
    timerId = setInterval(() => {
        const currentTime = Date.now();
        timeLeft = Math.ceil((targetEndTime - currentTime) / 1000);
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            resetTimer();
            return;
        }
        
        updateDisplay();
    }, 1000);
}

function updateDisplay() {
    const minutes = Math.max(Math.floor(timeLeft / 60), 0);
    document.getElementById('timer').textContent = minutes;
}

function resetTimer() {
    isRunning = false;
    timeLeft = 30 * 60;
    startTime = null;
    targetEndTime = null;
    document.body.style.backgroundColor = 'black';
    updateDisplay();
} 