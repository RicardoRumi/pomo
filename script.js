/*
 * Our timer is like a kitchen with different tools :
 * - timeLeft is like the countdown on a microwave
 * - timerId is like the on/off switch
 * - isRunning tells us if we're cooking or not
 * - startTime and targetEndTime are like the recipe's start and end times
 * - isThirtySecTimer is like choosing between microwave (30s) or oven (25min) mode
 */
let timeLeft = 60 * 60; // 60 minutes in seconds
let timerId = null;
let isRunning = false;
let startTime = null;
let targetEndTime = null;
let isThirtySecTimer = false;
let willBeepEvery30Seconds = false;

// Create audio element for change sound
const changeSound = new Audio('change.wav');
let audioInitialized = false;

// Sound configuration - easy to modify
const SOUND_CONFIG = {
    numberOfPlays: 1,    // How many times to play the sound
    gapBetween: 100     // Gap between plays in milliseconds
};

/*
 * The beep function is like a tiny musician in your device:
 * - Uses the change.wav sound
 * - Plays it the specified number of times
 * - Handles iOS audio restrictions
 */
function beep(config = SOUND_CONFIG) {
    try {
        if (!audioInitialized) {
            // For iOS, we need to load and play (it will be silent) on first interaction
            changeSound.load();
            changeSound.play().then(() => {
                audioInitialized = true;
            }).catch(e => console.log('Audio initialization error:', e));
        } else {
            // Reset the audio to start and play
            changeSound.currentTime = 0;
            const playPromise = changeSound.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log('Audio playback error:', e));
            }
        }
    } catch (e) {
        console.log('Audio error:', e);
    }
}

/*
 * These are like the background workers in a clock shop:
 * - One keeps the display window clean (auto scroll)
 * - Another updates the time display like a diligent clockmaker
 */
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

// First display setup, like setting up a shop window
updateDisplay();

/*
 * The click handler is like a shop with two departments:
 * - Upper floor (top half): Quick 30-second timer department
 * - Lower floor (bottom half): Traditional 25-minute pomodoro department
 * Each floor has its own staff and procedures
 */
document.body.removeAttribute('onclick');
document.body.addEventListener('click', handleClick);

function handleClick(event) {
    const middleOfScreen = window.innerHeight / 2;
    
    if (event.clientY < middleOfScreen) {
        willBeepEvery30Seconds = !willBeepEvery30Seconds;
        if (!isRunning) {
            startTimer();
        }
    } else {
        willBeepEvery30Seconds = false;
        if (!isRunning) {  // Only start if not already running
            startTimer();
        }
        // Do nothing if already running - timer must complete
    }
}

/*
 * The 30-second timer is like a quick microwave timer:
 * - Sets up quickly
 * - Counts down in seconds
 * - Beeps and restarts automatically like a microwave that keeps warming
 */
function start30SecTimer() {
    if (isRunning) return;
    
    isRunning = true;
    isThirtySecTimer = true;
    document.body.style.backgroundColor = 'blue';
    timeLeft = 30;
    
    function runTimer() {
        startTime = Date.now();
        targetEndTime = startTime + (timeLeft * 1000);
        
        timerId = setInterval(() => {
            const currentTime = Date.now();
            timeLeft = Math.floor((targetEndTime - currentTime) / 1000);
            
            if (timeLeft <= 0) {
                beep();
                timeLeft = 30;
                startTime = Date.now();
                targetEndTime = startTime + (timeLeft * 1000);
            }
            
            updateDisplay();
        }, 1000);
    }
    
    runTimer();
}

/*
 * The 25-minute timer is like a traditional oven timer:
 * - Takes longer to complete
 * - Shows time in minutes instead of seconds
 * - Stops completely when done, like a proper oven timer
 */
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    isThirtySecTimer = false;
    timeLeft = 60 * 60;
    startTime = Date.now();
    targetEndTime = startTime + (timeLeft * 1000);
    
    timerId = setInterval(() => {
        const currentTime = Date.now();
        timeLeft = Math.ceil((targetEndTime - currentTime) / 1000);
        if (willBeepEvery30Seconds) {
            document.body.style.backgroundColor = 'blue';
            if (timeLeft % 30 === 0) {
                beep();
            }
        } else {
            document.body.style.backgroundColor = 'red';
        }



        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            resetTimer();
            return;
        }
        
        updateDisplay();
    }, 1000);
}

/*
 * The display update is like a digital sign updater:
 * - Checks which department we're in (30s or 25min)
 * - Updates the numbers accordingly
 * - Makes sure we never show negative numbers
 */
function updateDisplay() {
    if (isThirtySecTimer) {
        document.getElementById('timer').textContent = Math.max(timeLeft, 0);
    } else {
        const minutes = Math.max(Math.floor(timeLeft / 60), 0);
    document.getElementById('timer').textContent = minutes;
    }
}

/*
 * The reset function is like closing time at the shop:
 * - Turns off all the timers
 * - Resets all the displays
 * - Returns everything to its original state
 * - Turns off the lights (changes background to black)
 */
function resetTimer() {
    isRunning = false;
    isThirtySecTimer = false;
    timeLeft = 60 * 60;
    startTime = null;
    targetEndTime = null;
    document.body.style.backgroundColor = 'black';
    updateDisplay();
}

// Initialize audio on first interaction
document.body.addEventListener('click', () => {
    if (!audioInitialized) {
        beep();
    }
}, { once: true }); 