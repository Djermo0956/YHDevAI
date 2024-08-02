const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const backgroundVideo = document.getElementById('backgroundVideo');

let playerLeft = 50;
let isAlive = false; // Track if the player is alive
let obstacleInterval, collisionInterval;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    isAlive = true; // Set the game state to alive
    playerLeft = 50; // Reset player position
    player.style.left = playerLeft + 'px';
    player.style.bottom = '0'; // Reset player position vertically

    obstacle.style.left = '800px'; // Reset obstacle position

    startButton.style.display = 'none'; // Hide start button
    restartButton.style.display = 'none'; // Hide restart button

    backgroundVideo.play(); // Start playing the video with sound

    obstacleInterval = setInterval(moveObstacle, 20);
    collisionInterval = setInterval(checkCollision, 10);
}

function restartGame() {
    isAlive = true; // Set the game state to alive
    playerLeft = 50; // Reset player position
    player.style.left = playerLeft + 'px';
    player.style.bottom = '0'; // Reset player position vertically

    obstacle.style.left = '800px'; // Reset obstacle position

    restartButton.style.display = 'none'; // Hide restart button

    backgroundVideo.currentTime = 0; // Reset video to start
    backgroundVideo.play(); // Start playing the video again

    obstacleInterval = setInterval(moveObstacle, 20);
    collisionInterval = setInterval(checkCollision, 10);
}

function jump() {
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
        setTimeout(() => {
            player.classList.remove('jump');
        }, 600);
    }
}

function moveLeft() {
    if (playerLeft > 0) {
        playerLeft -= 10;
        player.style.left = playerLeft + 'px';
    }
}

function moveRight() {
    if (playerLeft < 750) {
        playerLeft += 10;
        player.style.left = playerLeft + 'px';
    }
}

function moveObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    obstacle.style.left = obstacleLeft - 5 + 'px';

    if (obstacleLeft <= 0) {
        obstacle.style.left = '800px'; // Reset position to the right of the screen
    }
}

function checkCollision() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (isAlive && obstacleLeft < playerLeft + 50 && obstacleLeft > playerLeft && playerTop >= 350) {
        alert('Game Over!'); // Game over alert
        isAlive = false; // Set alive state to false
        clearInterval(obstacleInterval); // Stop moving the obstacle
        clearInterval(collisionInterval); // Stop collision checking
        restartButton.style.display = 'block'; // Show restart button
        backgroundVideo.pause(); // Pause video on game over
    }
}

document.addEventListener('keydown', (e) => {
    if (isAlive) {
        if (e.code === 'Space') {
            jump();
        } else if (e.code === 'ArrowLeft') {
            moveLeft();
        } else if (e.code === 'ArrowRight') {
            moveRight();
        }
    }
});
