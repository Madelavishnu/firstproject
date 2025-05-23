
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = Array(9).fill("");

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill("");
  currentPlayer = "X";
  statusText.textContent = `Player X's turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });
}

resetButton.addEventListener("click", resetGame);
cells.forEach(cell => cell.addEventListener("click", handleClick));
