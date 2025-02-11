let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;
let startTime = null;
let targetEndTime = null;

// Auto scroll to bottom
setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight);
}, 100);

// Update current time every second
setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('hours-only').textContent = hours;
    document.getElementById('minutes-display').textContent = mins;
}, 1000);

// Call updateDisplay immediately when the script loads
updateDisplay();

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    document.body.style.backgroundColor = 'red';
    startTime = Date.now();
    targetEndTime = startTime + (timeLeft * 1000);
    
    timerId = setInterval(() => {
        const currentTime = Date.now();
        // Calculate remaining time based on actual elapsed time
        timeLeft = Math.ceil((targetEndTime - currentTime) / 1000);
        
        // Check if timer should end
        if (timeLeft <= 0) {
            clearInterval(timerId);
            resetTimer();
            return;
        }
        
        updateDisplay();
    }, 1000);
    
    // Add a sync check every minute to ensure accuracy
    setInterval(() => {
        if (isRunning) {
            const currentTime = Date.now();
            timeLeft = Math.ceil((targetEndTime - currentTime) / 1000);
            updateDisplay();
        }
    }, 60000);
}

function updateDisplay() {
    const minutes = Math.max(Math.ceil(timeLeft / 60), 0); // Round up to show current minute, minimum 0
    document.getElementById('timer').textContent = minutes;
}

function resetTimer() {
    isRunning = false;
    timeLeft = 25 * 60;
    startTime = null;
    targetEndTime = null;
    document.body.style.backgroundColor = 'black';
    updateDisplay();
} 