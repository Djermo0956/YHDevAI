const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

function jump() {
    if (player.classList != 'jump') {
        player.classList.add('jump');
        setTimeout(() => {
            player.classList.remove('jump');
        }, 300);
    }
}

let isAlive = setInterval(() => {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft < 100 && obstacleLeft > 0 && playerTop >= 350) {
        alert('Game Over!');
    }
}, 10);
