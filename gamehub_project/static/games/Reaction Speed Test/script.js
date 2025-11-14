let screen = document.getElementById("screen");
let resultEl = document.getElementById("result");
let bestTimeEl = document.getElementById("bestTime");

let startTime, timeoutId;
let best = null;
let waitingForGreen = false;

screen.addEventListener("click", () => {
  // Clicked too early
  if (waitingForGreen && screen.style.background !== "green") {
    clearTimeout(timeoutId);
    screen.textContent = "Too Early!";
    screen.style.background = "#d32f2f";
    waitingForGreen = false;
    return;
  }

  // Start the game
  if (screen.textContent === "Click to Start" || screen.textContent === "Too Early!") {
    startWaiting();
    return;
  }

  // Reaction clicked on green
  if (screen.style.background === "green") {
    const reactionTime = Date.now() - startTime;
    resultEl.textContent = `Your Reaction Time: ${reactionTime} ms`;

    if (best === null || reactionTime < best) {
      best = reactionTime;
      bestTimeEl.textContent = `Best: ${best} ms`;
    }

    screen.textContent = "Click to Start";
    screen.style.background = "#333";
    waitingForGreen = false;
  }
});

function startWaiting() {
  screen.textContent = "Wait for Green...";
  screen.style.background = "#f57c00";
  waitingForGreen = true;

  const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds

  timeoutId = setTimeout(() => {
    screen.style.background = "green";
    screen.textContent = "CLICK!";
    startTime = Date.now();
  }, delay);
}
