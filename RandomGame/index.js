let answer;
let attempts;
let timer;
let timeLeft = 30;

function mainPage() {
  window.location.href = "https://gomida05.github.io";
}

function startGame() {
  answer = Math.floor(Math.random() * 100) + 1; // 1-100
  attempts = 0;
  timeLeft = 30;
  document.getElementById("ans").textContent = "";
  document.getElementById("txt").value = "";
  document.getElementById("txt").disabled = false;
  document.getElementById("btn").disabled = false;
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  document.getElementById("startTimeBtn").style.display = "none";
  document.getElementById("demo").style.display = "block";
  document.getElementById("demo").textContent = `${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("demo").textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("ans").textContent = `Time's up! The answer was ${answer}.`;
      document.getElementById("txt").disabled = true;
      document.getElementById("btn").disabled = true;
      setTimeout(askReplay, 1500);
    }
  }, 1000);
}

function checkKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    play();
  }
}

function play() {
  const input = document.getElementById("txt");
  let guess = Number(input.value.trim());
  if (isNaN(guess) || guess < 1 || guess > 100) {
    document.getElementById("ans").textContent = "Please enter a number between 1 and 100.";
    return;
  }
  attempts++;
  if (guess === answer) {
    clearInterval(timer);
    document.getElementById("ans").textContent = `Correct! The answer was ${answer}. Attempts: ${attempts}`;
    document.getElementById("txt").disabled = true;
    document.getElementById("btn").disabled = true;
    setTimeout(askReplay, 1000);
  } else if (guess < answer) {
    document.getElementById("ans").textContent = "Too low! Try again.";
  } else {
    document.getElementById("ans").textContent = "Too high! Try again.";
  }
}

function askReplay() {
  if (window.confirm("Do you want to play again?")) {
    startGame();
  }
}

// Initial prompt
window.onload = function () {
  if (window.confirm("You have 30 seconds to guess the random number. Ready?")) {
    startGame();
  } else {
    document.getElementById("demo").style.display = "none";
    document.getElementById("ans").textContent = "Game cancelled.";
    document.getElementById("txt").disabled = true;
    document.getElementById("btn").disabled = true;
  }
};
