let previousTime = performance.now();
let score = 0


Pipes.spawnPipe();
setInterval(Pipes.spawnPipe, 2000);

function checkCollision() {
    const bird = Bird.bird
    const radius = bird.width / 2

    for (const pipe of Pipes.pipes) {
        const gapTop = pipe.gapY - PIPE_GAP / 2
        const gapBottom = pipe.gapY + PIPE_GAP / 2

        const inPipeX = bird.x + radius > pipe.x && bird.x - radius < pipe.x + PIPE_WIDTH
        const inPipeY = bird.y - radius < gapTop || bird.y + radius > gapBottom

        if (inPipeX && inPipeY) {
            console.log("törmäys!")
            // GAME OVER
        }

        if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
            pipe.passed = true
            score++
            console.log("pisteet:", score)
        }
    }
}


function loop(now) {
    const deltaTime = Math.min((now - previousTime) / 1000, 0.033);
    previousTime = now;

    Pipes.updatePipes(deltaTime);
    Bird.update(deltaTime);
    checkCollision();
    Bird.draw();
    Pipes.drawPipes();

    

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);