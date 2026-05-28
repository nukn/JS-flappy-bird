const PIPE_WIDTH = 60
const PIPE_GAP = 160
const PIPE_SPEED = 200

let pipes = []
const pipeImg = new Image()
pipeImg.src = "images/PipeStyle1.png"

const PIPE_ROW = 1
const PIPE_COL = 2

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

    pipes.forEach(pipe => {
        const topHeight = pipe.gapY - PIPE_GAP / 2
        const bottomY = pipe.gapY + PIPE_GAP / 2
        const bottomHeight = c.height - bottomY

        const srcW = pipeImg.width / 4
        const srcH = pipeImg.height / 2
        const srcX = PIPE_COL * srcW
        const srcY = PIPE_ROW * srcH

        ctx.save()
        ctx.translate(pipe.x, topHeight)
        ctx.scale(1, -1)
        ctx.drawImage(pipeImg, srcX, srcY, srcW, srcH, 0, 0, PIPE_WIDTH, topHeight)
        ctx.restore()


        ctx.drawImage(pipeImg, srcX, srcY, srcW, srcH, pipe.x, bottomY, PIPE_WIDTH, bottomHeight)
    });
}

window.Pipes = { pipes, spawnPipe, updatePipes, drawPipes }