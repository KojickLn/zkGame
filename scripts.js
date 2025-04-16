function toggleRulesBtn(visible) {
    const rulesBtn = document.getElementById('rulesBtn');
    if (visible) {
      rulesBtn.style.display = 'block';
    } else {
      rulesBtn.style.display = 'none';
    }
}
  
const game = document.getElementById('game');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const menuBtn = document.getElementById('menuBtn');
const rulesBtn = document.getElementById('rulesBtn');
const finalScoreEl = document.getElementById('finalScore');
const message = document.getElementById('message');
let score = 0;
let errors = 0;
let missedCorrect = 0;
let gameInterval;
const validWords = ['ZKP', 'PROOF', 'VALID', 'SNARK', 'STARK', 'NULLIFIER', 'CIRCUIT', 'WITNESS', 'SIGNAL', 'GROTH16', 'MERKLE'];
const fakeWords = ['BUG', 'MAL', 'FRAUD', 'LEAK', 'HACK', 'VIRUS', 'EXPLOIT', 'SPYWARE', 'BREACH'];
const allWords = [...validWords, ...fakeWords];
const endGameSound = document.getElementById('endGameSound')
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const gameRules = document.getElementById('gameRules')  
const logoMain = document.getElementById('logoMain')
const logoTestGit = document.getElementById('logoTestGit')

function createBlock() {
    const word = allWords[Math.floor(Math.random() * allWords.length)];
    const block = document.createElement('div');
    block.className = 'block';
    block.textContent = word;
    block.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
    block.style.top = '0px';
    game.appendChild(block);
  
    let pos = 0;
    const fall = setInterval(() => {
      if (pos > window.innerHeight - 50) {
        clearInterval(fall);
        game.removeChild(block);
        if (validWords.includes(word)) {
          missedCorrect++;
          wrongSound.play();
          if (missedCorrect >= 2) {
            wrongSound.play();
            endGame();
            return;
          }
        }
      } else {
        pos += 3;
        block.style.top = `${pos}px`;
      }
    }, 30);
  
    block.addEventListener('click', () => {
      if (validWords.includes(word)) {
        correctSound.play();
        score += 10;
        message.textContent = 'Succinct! ✅';
      } else {
        wrongSound.play();
        score -= 5;
        errors++;
        message.textContent = 'OOF! ❌';
        if (errors >= 3) {
          endGame();
          return;
        }
      }
      document.getElementById('score').textContent = `Score: ${score}`;
      clearInterval(fall);
      game.removeChild(block);
    });
}
  
function startGame() {
    score = 0;
    errors = 0;
    missedCorrect = 0;
    document.getElementById('score').textContent = 'Score: 0';
    message.textContent = 'Click ✅ for good, ❌ for bad!';
    logoTestGit.style.display = 'none';
    logoMain.style.display = 'none';
    welcomeMessage.style.display = 'none';
    finalScoreEl.style.display = 'none';
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    menuBtn.style.display = 'none';
    game.style.display = 'block';
    toggleRulesBtn(false); 
    gameInterval = setInterval(createBlock, 1000);
}
  
function endGame() {
    clearInterval(gameInterval);
    endGameSound.play()
    document.querySelectorAll('.block').forEach(block => block.remove());
    game.style.display = 'none';
    finalScoreEl.textContent = `Game Over! Your score: ${score}`;
    finalScoreEl.style.display = 'block';
    restartBtn.style.display = 'block';
    menuBtn.style.display = 'block';
}
  
startBtn.addEventListener('click', () => {
    toggleRulesBtn(false); 
    startGame();
});
  
restartBtn.addEventListener('click', () => {
    toggleRulesBtn(false); 
    startGame();
});
  
menuBtn.addEventListener('click', () => {
    logoMain.style.display = 'none';
    logoTestGit.style.display = 'none';
    welcomeMessage.style.display = 'none';
    finalScoreEl.style.display = 'none';
    restartBtn.style.display = 'none';
    menuBtn.style.display = 'none';
    startBtn.style.display = 'block';
    toggleRulesBtn(true); 
});
  

rulesBtn.addEventListener('click', () => {
    alert(gameRules.innerText)
});

document.addEventListener('DOMContentLoaded', () => {
  logoTestGit.style.display = 'block';
  logoMain.style.display = 'block';
  welcomeMessage.style.display = 'block'; 
  startBtn.style.display = 'block'; 
  toggleRulesBtn(true); 
});

menuBtn.addEventListener('click', () => {
  logoTestGit.style.display = 'block';
  logoMain.style.display = 'block';
  welcomeMessage.style.display = 'block'; 
  finalScoreEl.style.display = 'none';
  restartBtn.style.display = 'none';
  menuBtn.style.display = 'none';
  startBtn.style.display = 'block';
  toggleRulesBtn(true); 
});