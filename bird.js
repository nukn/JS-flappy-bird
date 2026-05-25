(function () {
	const canvas = document.getElementById("peliCanvas");
	if (!canvas) {
		return;
	}

	const ctx = canvas.getContext("2d");

	const bird = {
		x: canvas.width * 0.3,
		y: canvas.height * 0.5,
		width: 34,
		height: 24,
		velocityY: 0,
		gravity: 1700,
		flapStrength: -480,
		maxFallSpeed: 900,
		rotation: 0
	};

	let previousTime = performance.now();

	function flap() {
		bird.velocityY = bird.flapStrength;
	}

	canvas.addEventListener("mousedown", flap);

	function update(deltaTime) {
		bird.velocityY += bird.gravity * deltaTime;
		if (bird.velocityY > bird.maxFallSpeed) {
			bird.velocityY = bird.maxFallSpeed;
		}

		bird.y += bird.velocityY * deltaTime;

		const top = bird.y - bird.height / 2;
		const bottom = bird.y + bird.height / 2;

		if (top < 0) {
			bird.y = bird.height / 2;
			bird.velocityY = 0;
		}

		if (bottom > canvas.height) {
			bird.y = canvas.height - bird.height / 2;
			bird.velocityY = 0;
		}

		const targetRotation = bird.velocityY < 0 ? -0.35 : 0.9;
		bird.rotation += (targetRotation - bird.rotation) * 8 * deltaTime;
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.save();
		ctx.translate(bird.x, bird.y);
		ctx.fillStyle = "#ffd447";
		ctx.beginPath();
		ctx.arc(0, 0, bird.width / 2, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	function loop(now) {
		const deltaTime = Math.min((now - previousTime) / 1000, 0.033);
		previousTime = now;

		update(deltaTime);
		draw();

		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);
})();
