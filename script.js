const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
let playerLeft = 50;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    } else if (e.code === 'ArrowLeft') {
        moveLeft();
    } else if (e.code === 'ArrowRight') {
        moveRight();
    }
});

function jump() {
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
        setTimeout(() => {
            player.classList.remove('jump');
        }, 300);
    }
}

function moveLeft() {
    if (playerLeft > 0) {
        playerLeft -= 10;
        player.style.left = playerLeft + 'px';
    }
}

function moveRight() {
    if (playerLeft < 750) { // Ensures the player does not move out of the container
        playerLeft += 10;
        player.style.left = playerLeft + 'px';
    }
}

let isAlive = setInterval(() => {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft < playerLeft + 50 && obstacleLeft > playerLeft && playerTop >= 350) {
        alert('Game Over!');
    }
}, 10);

function moveObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    obstacle.style.left = obstacleLeft - 5 + 'px';

    if (obstacleLeft <= 0) {
        obstacle.style.left = '800px'; // Reset position to the right of the screen
    }
}

// Call the function repeatedly
setInterval(moveObstacle, 20);
