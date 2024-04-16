let allBoards = [];
let usedBoards = [];
let restartBoard;
let currentBoard;
let moves = 0;
let timer;
let timeElapsed = 0;
let gameOver = false;

const boardContainer = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const newGameButton = document.getElementById("new-game");
const restartGameButton = document.getElementById("restart-game");

function getGridFromJSON() {
  console.log("Loading game...");
  boardContainer.style.display = "none";

  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:5500/boards.json", true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        console.log("Game loaded successfully.");

        var data = JSON.parse(request.responseText);
        allBoards = data;
        newGameButton.disabled = false;
        newGameButton.addEventListener("click", startGame);
        restartGameButton.addEventListener("click", restartGame);
        boardContainer.style.display = "grid";
        resolve();
      } else {
        console.error("Error loading boards:", request.statusText);
        reject(request.statusText);
      }
    };
    request.onerror = function () {
      console.error("Error loading boards:", request.statusText);
      reject(request.statusText);
    };
    request.send();
  });
}

getGridFromJSON();

function startGame() {
  clearBoard();
  if (usedBoards.length === allBoards.length) {
    usedBoards = [];
    getGridFromJSON()
      .then(() => {
        performStartGameActions();
      })
      .catch((error) => {
        console.error("Error in startGame:", error);
      });
  } else {
    performStartGameActions();
  }
}

function performStartGameActions() {
  var minMoves;
  let remainingBoards = allBoards.filter(
    (board) => !usedBoards.includes(board)
  );
  const boardIndex = Math.floor(Math.random() * remainingBoards.length);
  currentBoard = remainingBoards[boardIndex].board;
  restartBoard = JSON.parse(JSON.stringify(remainingBoards[boardIndex].board));
  usedBoards.push(remainingBoards[boardIndex]);
  minMoves = remainingBoards[boardIndex].minMoves;
  renderBoard(currentBoard);
  moves = 0;
  movesDisplay.textContent = moves;
  timeElapsed = 0;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  gameOver = false;
}

function restartGame() {
  if (typeof restartBoard == "undefined") {
    console.log("The game has not yet started.");
  } else {
    clearBoard();
    renderBoard(restartBoard);
    moves = 0;
    movesDisplay.textContent = moves;
    timeElapsed = 0;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    gameOver = false;
  }
}

function checkWin() {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (currentBoard[row][col]) {
        return;
      }
    }
  }
  clearInterval(timer);
  const minMoves = usedBoards.find(
    (board) => board.board === currentBoard
  ).minMoves;
  const message =
    moves === minMoves
      ? "Congratulations! You won in the minimum number of moves."
      : `You won, but try to do it in ${minMoves} moves next time.`;
  alert(message);
  gameOver = true;
}

function clearBoard() {
  while (boardContainer.firstChild) {
    boardContainer.removeChild(boardContainer.firstChild);
  }
}

function renderBoard(board) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (board[row][col]) {
        cell.classList.add("on");
      }
      cell.addEventListener("click", () => {
        if (!gameOver) {
          toggleCell(row, col);
        }
      });
      boardContainer.appendChild(cell);
    }
  }
}

function toggleCell(row, col) {
  toggleCellState(row, col);
  toggleCellState(row - 1, col);
  toggleCellState(row + 1, col);
  toggleCellState(row, col - 1);
  toggleCellState(row, col + 1);
  moves++;
  movesDisplay.textContent = moves;
  checkWin();
}

function toggleCellState(row, col) {
  if (row >= 0 && row < 5 && col >= 0 && col < 5) {
    const cell = boardContainer.children[row * 5 + col];
    cell.classList.toggle("on");
    currentBoard[row][col] = currentBoard[row][col] ? 0 : 1;
  }
}

function updateTimer() {
  timeElapsed++;
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  timerDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
