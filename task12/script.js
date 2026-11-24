
let secretNumber = Math.floor(Math.random() * 20) + 1;
let attemptsLeft = 5;
let score = 0;
let gameOver = false;


const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const messageArea = document.getElementById('messageArea');
const attemptsDisplay = document.getElementById('attemptsLeft');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameCard = document.getElementById('gameCard');
const confettiContainer = document.getElementById('confettiContainer');


function showMessage(text, type) {
    messageArea.textContent = text;
    messageArea.className = 'message-box'; 
    if (type) {
        messageArea.classList.add(type);
    }
}


function triggerCelebration() {
    gameCard.classList.add('celebrate');
    const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        confettiContainer.appendChild(confetti);

       
        setTimeout(() => confetti.remove(), 3500);
    }
}


function checkGuess() {
    if (gameOver) return;

    const userGuess = Number(guessInput.value);

    // Validate input
    if (!guessInput.value || userGuess < 1 || userGuess > 20) {
        showMessage('Please enter a valid number between 1 and 20!', 'error');
        return;
    }

   
    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

  
    if (userGuess === secretNumber) {
        // Player Won!
        const pointsEarned = (attemptsLeft + 1) * 10; 
        score += pointsEarned;
        scoreDisplay.textContent = score;

        showMessage(`🎉 Correct! You Won! (+${pointsEarned} pts)`, 'success');
        triggerCelebration();
        endGame();
    } else if (attemptsLeft === 0) {
        // Player ran out of attempts
        showMessage(`Game Over! Out of attempts. The number was ${secretNumber}.`, 'error');
        endGame();
    } else if (userGuess > secretNumber) {
        // Guess is too high
        showMessage('Too High! Try a smaller number.', 'hint');
    } else {
        // Guess is too low
        showMessage('Too Low! Try a larger number.', 'hint');
    }

    guessInput.value = '';
    if (!gameOver) {
        guessInput.focus();
    }
}


function endGame() {
    gameOver = true;
    guessInput.disabled = true;
    checkBtn.disabled = true;
    playAgainBtn.classList.remove('hidden');
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    attemptsLeft = 5;
    gameOver = false;

    attemptsDisplay.textContent = attemptsLeft;
    guessInput.value = '';
    guessInput.disabled = false;
    checkBtn.disabled = false;
    playAgainBtn.classList.add('hidden');
    gameCard.classList.remove('celebrate');

    showMessage('New round started! Guess a number between 1 and 20.', '');
    guessInput.focus();
}


checkBtn.addEventListener('click', checkGuess);
playAgainBtn.addEventListener('click', resetGame);


guessInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});