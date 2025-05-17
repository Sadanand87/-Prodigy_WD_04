const board = document.getElementById('board');
const statusText = document.getElementById('status');

let cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    statusText.textContent = `It's a draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

// Initialize game
createBoard();
statusText.textContent = `Player ${currentPlayer}'s turn`;
