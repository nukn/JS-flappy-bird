(function () {
	const canvas = document.getElementById("peliCanvas");
	if (!canvas) {
		return;
	}

	const ctx = canvas.getContext("2d");
	const birdImage = new Image();
	birdImage.src = "images/Flappy Bird Assets 1.6 (Zip)/Flappy Bird Assets/Player/StyleBird2/Bird2-1.png";
	const spriteFrameCount = 4;
	const flapSequence = [0, 1, 2, 3, 2, 1];
	const flapFrameDuration = 0.20;

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

	let flapTimer = 0;
	let flapSequenceIndex = 0;

	function flap() {
		bird.velocityY = bird.flapStrength;
	}

	canvas.addEventListener("mousedown", flap);

	function update(deltaTime) {
		flapTimer += deltaTime;
		if (flapTimer >= flapFrameDuration) {
			flapTimer = 0;
			flapSequenceIndex = (flapSequenceIndex + 1) % flapSequence.length;
		}

		bird.velocityY += bird.gravity * deltaTime;
		if (bird.velocityY > bird.maxFallSpeed) {
			bird.velocityY = bird.maxFallSpeed;
		}

		bird.y += bird.velocityY * deltaTime;

		const birdTop = bird.y - bird.height / 2;
		const birdBottom = bird.y + bird.height / 2;

		if (birdTop < 0) {
			bird.y = bird.height / 2;
			bird.velocityY = 0;
		}

		if (birdBottom > canvas.height) {
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
		ctx.rotate(bird.rotation);

		if (birdImage.complete && birdImage.naturalWidth > 0) {

			const isStrip = birdImage.naturalWidth > birdImage.naturalHeight * 1.5;
			if (isStrip) {
				const frameWidth = Math.floor(birdImage.naturalWidth / spriteFrameCount);
				const currentSpriteFrame = Math.min(flapSequence[flapSequenceIndex], spriteFrameCount - 1);
				const sourceX = currentSpriteFrame * frameWidth;
				ctx.drawImage(
					birdImage,
					sourceX,
					0,
					frameWidth,
					birdImage.naturalHeight,
					-bird.width / 2,
					-bird.height / 2,
					bird.width,
					bird.height
				);
			} else {
				ctx.drawImage(
					birdImage,
					-bird.width / 2,
					-bird.height / 2,
					bird.width,
					bird.height
				);
			}
		} else {
			ctx.fillStyle = "#ffd447";
			ctx.beginPath();
			ctx.arc(0, 0, bird.width / 2, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}

	window.Bird = { bird, update, draw, flap };

    
})();



