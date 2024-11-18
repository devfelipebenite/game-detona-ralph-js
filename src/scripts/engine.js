const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
        record: 0,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000),
    },
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        gameOver();
    }
}

function gameOver() {
    state.values.lives--;

    if (state.values.lives > 0) {
        alert(`Você perdeu uma vida! Vidas restantes: ${state.values.lives}`);
        resetGame();
    } else {
        if (state.values.result > state.values.record) {
            state.values.record = state.values.result;
        }
        alert(
            `Game Over! O seu resultado foi: ${state.values.result}, Recorde total: ${state.values.record}`
        )
        resetGame(true);
    }
}

function resetGame(resetAll = false) {
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (resetAll) {
        state.values.result = 0;
        state.values.lives = 3;
    }

    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = state.values.lives;

    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 1000);
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}

function init() {
    addListenerHitBox();
    state.view.lives.textContent = state.values.lives;
}

init();
