/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board')

const resetBtnEl = document.createElement('button');
resetBtnEl.id = 'reset';
resetBtnEl.textContent = 'Reset';

document.body.appendChild(resetBtnEl);


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let gameOver = false;
let currentTurn = 'X';

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = Array(9).fill(""); // Initialize board with empty strings
  turn = "X";
  winner = false;
  tie = false;
  gameOver = false;
  render();
  messageEl.textContent = `Current turn: ${currentTurn}`;
}

function render() {
  board.forEach((mark, index) => {
    squareEls[index].textContent = mark;
  });
  updateMessage();
}

function updateMessage() {
  if (gameOver) {
    if (winner) {
      messageEl.textContent = `${turn} Wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    }
  } else {
    messageEl.textContent = `Current turn: ${currentTurn}`;
  }
}

function handleClick(event) {
  squareIndex = parseInt(event.target.id);
  if (board[squareIndex] !== "") return;

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  if (!gameOver) {
    switchPlayerTurn();
  }
  updateMessage();
}

function placePiece(index) {
  board[index] = turn;
  squareEls[index].textContent = turn;
}

function checkForWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      gameOver = true;
      return;
    }
  }
}

function checkForTie() {
  if (winner === true) return;
  tie = board.every(cell => cell !== "");
  if (tie) {
    gameOver = true;
  }
}

function switchPlayerTurn() {
  turn = turn === 'X' ? 'O' : 'X'; // Switch between X and O
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init);
           
init();