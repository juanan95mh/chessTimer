let clear;
let lastTime = Date.now();

let playerOne = {
    id: 1,
    time: 60 * 5,
    increment: 3,
    btn: document.getElementById("player1"),
    timer: document.getElementById('timer1'),
    going: 0
};

let playerTwo = {
    id: 2,
    time: 60 * 5,
    increment: 3,
    btn: document.getElementById("player2"),
    timer: document.getElementById('timer2'),
    going: 0
}

// Function to initialize the timers
function initializeTimers() {
    playerOne.timer.innerHTML = displayTime(playerOne);
    playerTwo.timer.innerHTML = displayTime(playerTwo);
}

function stopGo(playerObj, oponentObj) {
    let currentTime = Date.now();
    let elapsedTime = (currentTime - lastTime) / 1000; // tiempo transcurrido en segundos
    lastTime = currentTime;

    if (oponentObj.going == 0) {
        oponentObj.going = 1;
        oponentObj.time -= elapsedTime; // Actualizar el tiempo del jugador
        resumeTimer(oponentObj);
        if (playerObj.going == 1) {
            playerObj.time += playerObj.increment;
            playerObj.going = 0;
        }
        oponentObj.btn.innerHTML = "Tu Turno!";
        playerObj.btn.innerHTML = "Jugador " + playerObj.id;
    } else if (playerObj.btn.innerHTML == "Tu Turno!") { // ?¿?¿?¿?
        playerObj.going = 0;
        playerObj.btn.innerHTML = "Jugador " + playerObj.id;
        oponentObj.going = 1;
    }
}

function resumeTimer(player) {
    if (player.going == 1) {
        clear = setTimeout(() => {
            let currentTime = Date.now();
            let elapsedTime = (currentTime - lastTime) / 1000; // tiempo transcurrido en segundos
            lastTime = currentTime;

            player.time -= elapsedTime; // restar el tiempo transcurrido
            player.timer.innerHTML = displayTime(player);
            resumeTimer(player);
        }, 1000);
    }
    GameOver(player);
}

function displayTime(player) {
    let mins = Math.floor(player.time / 60);
    let secs = Math.floor(player.time % 60);

    return (secs >= 10) ? mins + ':' + secs : mins + ':0' + secs;
}

function GameOver(player) {
    if (player.time < 0) {
        clearTimeout(clear);
        alert('You lost!');
    }
}

// Call the initializeTimers function when the page loads
window.onload = initializeTimers;

// Add event listener for keyboard events
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        document.getElementById('player1').click();
    } else if (event.key === 'ArrowRight') {
        document.getElementById('player2').click();
    }
});
