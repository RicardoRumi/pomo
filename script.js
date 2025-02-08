let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    document.body.style.backgroundColor = 'red';
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            resetTimer();
        }
    }, 1000);
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
}

function resetTimer() {
    isRunning = false;
    timeLeft = 25 * 60; // Reset to 25 minutes
    document.body.style.backgroundColor = 'black';
    updateDisplay();
} 