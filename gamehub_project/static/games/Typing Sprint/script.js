const words = [
    "javascript","coding","sprint","challenge","keyboard",
    "function","variable","async","promise","performance",
    "browser","internet","react","python","hardware","software"
];

let timeLeft = 30;
let score = 0;
let correctTyped = 0;
let totalTyped = 0;
let timerInterval;

const wordDisplay = document.getElementById("word-display");
const inputBox = document.getElementById("input-box");
const timeText = document.getElementById("time");
const scoreText = document.getElementById("score");
const accuracyText = document.getElementById("accuracy");
const wpmText = document.getElementById("wpm");

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    resetGame();
    wordDisplay.textContent = randomWord();

    timerInterval = setInterval(() => {
        timeLeft--;
        timeText.textContent = timeLeft;

        if (timeLeft <= 0) endGame();

    }, 1000);
}

function resetGame() {
    timeLeft = 30;
    score = 0;
    correctTyped = 0;
    totalTyped = 0;

    timeText.textContent = "30";
    scoreText.textContent = "0";
    accuracyText.textContent = "0%";
    wpmText.textContent = "0";

    inputBox.value = "";
    inputBox.disabled = false;
    inputBox.focus();
}

inputBox.addEventListener("input", () => {
    const typedText = inputBox.value;
    const currentWord = wordDisplay.textContent;

    if (typedText.trim().length > 0) totalTyped++;

    if (typedText === currentWord) {
        score++;
        correctTyped++;

        scoreText.textContent = score;
        wordDisplay.textContent = randomWord();
        inputBox.value = "";
    }

    updateStats();
});

function updateStats() {
    let accuracy = totalTyped > 0 ? (correctTyped / totalTyped) * 100 : 0;
    accuracyText.textContent = accuracy.toFixed(1) + "%";

    let wpm = (correctTyped / (30 - timeLeft + 1)) * 60;
    wpmText.textContent = Math.round(wpm);
}

function endGame() {
    clearInterval(timerInterval);
    inputBox.disabled = true;
    wordDisplay.textContent = "Time's up!";
}

document.getElementById("restart-btn").addEventListener("click", startGame);

startGame();
