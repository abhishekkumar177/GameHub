const scrambledWordElement = document.getElementById("scrambledWord");
const userInput = document.getElementById("userInput");
const checkBtn = document.getElementById("checkBtn");
const refreshBtn = document.getElementById("refreshBtn");
const message = document.getElementById("message");

const words = [
  "planet", "computer", "javascript", "puzzle", "galaxy",
  "keyboard", "program", "butterfly", "internet", "developer",
  "picture", "holiday", "language", "creative", "website"
];

let currentWord = "";
let scrambledWord = "";

function shuffleWord(word) {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function newScramble() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  scrambledWord = shuffleWord(currentWord);

  while (scrambledWord === currentWord) {
    scrambledWord = shuffleWord(currentWord);
  }

  scrambledWordElement.textContent = scrambledWord.toUpperCase();
  message.textContent = "";
  userInput.value = "";
}

checkBtn.addEventListener("click", () => {
  const userAnswer = userInput.value.trim().toLowerCase();

  if (!userAnswer) {
    message.textContent = "Please enter a word!";
    message.style.color = "#ffcc70";
    return;
  }

  if (userAnswer === currentWord) {
    message.textContent = "🎉 Correct! You guessed it!";
    message.style.color = "#a7ff83";
  } else {
    message.textContent = `❌ Wrong! The correct word was "${currentWord}".`;
    message.style.color = "#ff7b7b";
  }
});

refreshBtn.addEventListener("click", newScramble);

// Initialize game
newScramble();
