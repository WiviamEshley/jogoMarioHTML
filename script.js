const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

let gameLoop;

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
            
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            
            mario.src = 'imagens/game-over.png';
            mario.style.width = '70px';
            mario.style.marginLeft = '35px';

            cloud.style.animation = 'none';
            cloud.style.left = `${cloudPosition}px`;

            gameOver.style.visibility = 'visible';

            clearInterval(gameLoop);
        }
    }, 10);
};

const restart = () => {
    clearInterval(gameLoop);
    
    gameOver.style.visibility = 'hidden';
    
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';
    
    mario.src = 'imagens/mario.gif';
    mario.style.width = '130px';
    mario.style.bottom = '0px';
    mario.style.marginLeft = '';
    mario.style.animation = 'none';
    setTimeout(() => {
        mario.style.animation = '';
    }, 10);
    
    cloud.style.animation = 'cloud-move 20s infinite linear';
    cloud.style.left = '';
    
    startGameLoop();
};

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
restartButton.addEventListener('click', restart);

startGameLoop();
