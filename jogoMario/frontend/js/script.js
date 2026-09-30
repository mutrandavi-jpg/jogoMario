const mario = document.querySelector('.mario');
const bowser = document.querySelector('.bowser')
const audios = ['./audios/grito2.mp3', './audios/grito3.mp3']

const scoreValueEl = document.querySelector('#score-value');
const finalScoreEl = document.querySelector('#final-score');
const gameOverScreen = document.querySelector('#game-over-screen');

let score = 0;
let gameOver = false;

// Placar sobe sozinho enquanto o jogo estiver rolando
const scoreLoop = setInterval(() => {
    score++;
    scoreValueEl.textContent = score;
}, 100);

const tocarAudioAleatorio = () => {
    const indiceAleatorio = Math.floor(Math.random() * audios.length);

    const audioSorteado = new Audio(audios[indiceAleatorio]);

    audioSorteado.play()

}

const loop = setInterval(() => {

    const bowserPosition = bowser.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    if (bowserPosition <= 120 && bowserPosition > 0 && marioPosition < 80) {

        bowser.style.animation = 'none';
        bowser.style.left = `${bowserPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        gameOver = true;

        clearInterval(loop);
        clearInterval(scoreLoop); // placar para de contar junto com o jogo

        // alguns segundos depois, mostra a tela de game over com a foto
        setTimeout(() => {
            finalScoreEl.textContent = score;
            gameOverScreen.classList.add('show');
        }, 2000);

    }

}, 10);

const jump = () => {
    if (gameOver) return; // trava o pulo depois do game over
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

}




document.addEventListener('keydown', jump);
document.addEventListener('keydown', tocarAudioAleatorio);
