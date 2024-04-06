document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.getElementById("gameArea");
  const startBtn = document.getElementById("startBtn");
  const difficultySelect = document.getElementById("difficulty");
  const colorSelect = document.getElementById("color");
  const header = document.getElementById("header");
  const menu = document.getElementById("menu");
  let score = 0;
  let timer;
  let timeLeft;
  let timerInterval;

  function startGame() {
    const selectedDifficulty = difficultySelect.value;
    const selectedColor = colorSelect.value;

    if (!selectedDifficulty || !selectedColor) {
      alert(
        "Please select both difficulty and color before starting the game."
      );
      return;
    }

    score = 0;
    gameArea.innerHTML = "";
    const squareSize = getSquareSize(selectedDifficulty);
    timeLeft = getTimeLimit(selectedDifficulty);
    const areaWidth = window.innerWidth;
    const areaHeight = window.innerHeight;
    startBtn.disabled = true;
    header.classList.add("hidden");
    menu.classList.add("hidden");

    gameArea.style.width = areaWidth + "px";
    gameArea.style.height = areaHeight + "px";
    const scoreDisplay = document.createElement("div");
    scoreDisplay.textContent = "Score: 0";
    gameArea.appendChild(scoreDisplay);

    const timeDisplay = document.createElement("div");
    timeDisplay.id = "timeDisplay";
    updateTimeDisplay(timeDisplay);
    gameArea.appendChild(timeDisplay);

    function generateSquare() {
      const square = document.createElement("div");
      square.className = "square";
      square.style.width = square.style.height = squareSize + "px";
      square.style.backgroundColor = selectedColor;
      square.style.left =
        Math.random() *
          (areaWidth - squareSize - getMargin(selectedDifficulty) * 2) +
        getMargin(selectedDifficulty) +
        "px";
      square.style.top =
        Math.random() *
          (areaHeight - squareSize - getMargin(selectedDifficulty) * 2) +
        getMargin(selectedDifficulty) +
        "px";
      square.addEventListener("click", () => {
        if (!timer) return;
        score++;
        gameArea.removeChild(square);
        scoreDisplay.textContent = "Score: " + score;
        clearTimeout(timer);
        clearInterval(timerInterval);
        resetTimer(timeDisplay);
        generateSquare();
      });
      gameArea.appendChild(square);
      timer = setTimeout(() => {
        timeLeft--;
        endGame();
        alert(
          "Time's up! Your score: " +
            score +
            ". To start game again, please, reload page."
        );
      }, timeLeft * 1000);
      timerInterval = setInterval(() => {
        timeLeft--;
        updateTimeDisplay(timeDisplay);
        if (timeLeft === 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    }
    generateSquare();
  }

  function updateTimeDisplay(timeDisplay) {
    timeDisplay.textContent = "Time left: " + timeLeft;
  }

  function resetTimer(timeDisplay) {
    clearInterval(timerInterval);
    timeLeft = getTimeLimit(difficultySelect.value);
    updateTimeDisplay(timeDisplay);
  }

  function endGame() {
    updateTimeDisplay(timeDisplay);
    clearTimeout(timer);
    timer = null;
    clearInterval(timerInterval);
  }

  function getSquareSize(difficulty) {
    switch (difficulty) {
      case "easy":
        return 70;
      case "medium":
        return 50;
      case "hard":
        return 30;
      default:
        return 70;
    }
  }

  function getMargin(difficulty) {
    switch (difficulty) {
      case "easy":
        return window.innerWidth * 0.25;
      case "medium":
        return window.innerWidth * 0.125;
      case "hard":
        return 0;
      default:
        return window.innerWidth * 0.25;
    }
  }

  function getTimeLimit(difficulty) {
    switch (difficulty) {
      case "easy":
        return 4;
      case "medium":
        return 2;
      case "hard":
        return 1;
      default:
        return 4;
    }
  }

  startBtn.addEventListener("click", startGame);
});
