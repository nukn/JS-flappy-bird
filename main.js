let previousTime = performance.now();
let score = 0
let gameStarted = false
let gameOver = false

const canvas = document.getElementById("peliCanvas")
const playBtn = document.getElementById("playBtn")
const restartBtn = document.getElementById("restartBtn")
const gameOverText = document.getElementById("gameOverText")

setInterval(() => {
    if (!gameStarted || gameOver) {
        return
    }
    Pipes.spawnPipe()
}, 2000)

function resetGameState() {
    score = 0
    previousTime = performance.now()
    gameOver = false

    Pipes.pipes.length = 0
    Pipes.spawnPipe()

    Bird.bird.x = canvas.width * 0.3
    Bird.bird.y = canvas.height * 0.5
    Bird.bird.velocityY = 0
    Bird.bird.rotation = 0
}

function showIdleUI() {
    playBtn.hidden = false
    restartBtn.hidden = true
    gameOverText.hidden = true
}

function showGameOverUI() {
    playBtn.hidden = true
    restartBtn.hidden = false
    gameOverText.hidden = false
}

function startGame() {
    gameStarted = true
    resetGameState()
    playBtn.hidden = true
    restartBtn.hidden = true
    gameOverText.hidden = true
}

playBtn?.addEventListener("click", startGame)
restartBtn?.addEventListener("click", startGame)

showIdleUI()

function checkCollision() {
    const bird = Bird.bird
    const radius = bird.width / 2

    for (const pipe of Pipes.pipes) {
        const gapTop = pipe.gapY - PIPE_GAP / 2
        const gapBottom = pipe.gapY + PIPE_GAP / 2

        const inPipeX = bird.x + radius > pipe.x && bird.x - radius < pipe.x + PIPE_WIDTH
        const inPipeY = bird.y - radius < gapTop || bird.y + radius > gapBottom

        if (inPipeX && inPipeY && !gameOver) {
            console.log("törmäys!")
            gameOver = true
            showGameOverUI()
            return
        }

        if (!gameOver && !pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
            pipe.passed = true
            score++
            console.log("pisteet:", score)
        }
    }
}


function loop(now) {
    const deltaTime = Math.min((now - previousTime) / 1000, 0.033);
    previousTime = now;

    if (gameStarted && !gameOver) {
        Pipes.updatePipes(deltaTime);
        Bird.update(deltaTime);
        checkCollision();
    }

    Bird.draw();
    Pipes.drawPipes();

    

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);