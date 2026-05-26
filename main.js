let previousTime = performance.now();

Pipes.spawnPipe();
setInterval(Pipes.spawnPipe, 2000);

function loop(now) {
    const deltaTime = Math.min((now - previousTime) / 1000, 0.033);
    previousTime = now;

    Pipes.updatePipes(deltaTime);
    Bird.update(deltaTime);
    Bird.draw();
    Pipes.drawPipes();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);