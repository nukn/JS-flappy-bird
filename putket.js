const PIPE_WIDTH = 60
const PIPE_GAP = 160
const PIPE_SPEED = 200

let pipes = []

function spawnPipe() {
    const c = document.getElementById("peliCanvas")
    const gapY = 150 + Math.random() * (c.height - 300)
    pipes.push({
        x: c.width,
        gapY: gapY
    });
}

function updatePipes(deltaTime) {
    pipes.forEach(pipe => {
        pipe.x -= PIPE_SPEED * deltaTime
    });
    for (let i = pipes.length - 1; i >= 0; i--) {
        if (pipes[i].x + PIPE_WIDTH <= 0) {
            pipes.splice(i, 1)
        }
    }
}

function drawPipes() {
    const c = document.getElementById("peliCanvas")
    const ctx = c.getContext("2d")
    ctx.fillStyle = "green"

    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY - PIPE_GAP / 2);
        ctx.fillRect(pipe.x, pipe.gapY + PIPE_GAP / 2, PIPE_WIDTH, c.height);
    });
}

window.Pipes = { pipes, spawnPipe, updatePipes, drawPipes }