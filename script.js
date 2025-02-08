let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;

// Call updateDisplay immediately when the script loads
updateDisplay();

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
    const minutes = Math.ceil(timeLeft / 60); // Round up to show current minute
    document.getElementById('timer').textContent = minutes;
    
    // Update hour and minutes display
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('hours-only').textContent = hours;
    document.getElementById('minutes-display').textContent = mins;
}

function resetTimer() {
    isRunning = false;
    timeLeft = 25 * 60;
    document.body.style.backgroundColor = 'black';
    updateDisplay();
} 