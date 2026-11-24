// Game State Variables
let userScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];

const choiceDetails = {
    rock: { label: 'Rock', emoji: '🪨' },
    paper: { label: 'Paper', emoji: '📄' },
    scissors: { label: 'Scissors', emoji: '✂️' }
};

// DOM Elements
const userScoreEl = document.getElementById('userScore');
const computerScoreEl = document.getElementById('computerScore');
const userChoiceIconEl = document.getElementById('userChoiceIcon');
const userChoiceTextEl = document.getElementById('userChoiceText');
const computerChoiceIconEl = document.getElementById('computerChoiceIcon');
const computerChoiceTextEl = document.getElementById('computerChoiceText');
const resultBannerEl = document.getElementById('resultBanner');
const resultTextEl = document.getElementById('resultText');
const roundMessageEl = document.getElementById('roundMessage');

const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');
const restartBtn = document.getElementById('restartBtn');

// Generate random computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine winner: 'win', 'lose', or 'draw'
function determineWinner(user, computer) {
    if (user === computer) {
        return 'draw';
    }
    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

// Trigger quick pop animation on choice emojis
function animateIcons() {
    userChoiceIconEl.classList.remove('pop');
    computerChoiceIconEl.classList.remove('pop');
    void userChoiceIconEl.offsetWidth; // Force reflow for re-animation
    userChoiceIconEl.classList.add('pop');
    computerChoiceIconEl.classList.add('pop');
}

// Play a single round
function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const outcome = determineWinner(userChoice, computerChoice);

    // Update displayed choices
    userChoiceIconEl.textContent = choiceDetails[userChoice].emoji;
    userChoiceTextEl.textContent = choiceDetails[userChoice].label;

    computerChoiceIconEl.textContent = choiceDetails[computerChoice].emoji;
    computerChoiceTextEl.textContent = choiceDetails[computerChoice].label;

    animateIcons();

    // Update score and result banner
    resultBannerEl.className = 'result-banner';

    const uLabel = choiceDetails[userChoice].label;
    const cLabel = choiceDetails[computerChoice].label;

    if (outcome === 'win') {
        userScore++;
        userScoreEl.textContent = userScore;
        resultBannerEl.classList.add('win');
        resultTextEl.textContent = 'You Win!';
        roundMessageEl.textContent = `${uLabel} beats ${cLabel}. Nice move!`;
    } else if (outcome === 'lose') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        resultBannerEl.classList.add('lose');
        resultTextEl.textContent = 'You Lose!';
        roundMessageEl.textContent = `${cLabel} beats ${uLabel}. Try again!`;
    } else {
        resultBannerEl.classList.add('draw');
        resultTextEl.textContent = "It's a Draw!";
        roundMessageEl.textContent = `Both of you chose ${uLabel}.`;
    }
}

// Reset scores and UI to initial state
function restartGame() {
    userScore = 0;
    computerScore = 0;
    userScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';

    userChoiceIconEl.textContent = '❔';
    userChoiceTextEl.textContent = '-';
    computerChoiceIconEl.textContent = '❔';
    computerChoiceTextEl.textContent = '-';

    resultBannerEl.className = 'result-banner neutral';
    resultTextEl.textContent = 'Make Your Move!';
    roundMessageEl.textContent = 'Game reset! Click Rock, Paper, or Scissors to play.';
}

// Event Listeners
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
restartBtn.addEventListener('click', restartGame);