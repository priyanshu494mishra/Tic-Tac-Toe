let mode = "human";
let player1 = "Player X", player2 = "Player O";
let currentPlayer = "X";
let gameActive = true;
let cells = [];
let difficulty = "easy";
let scoreX = 0, scoreO = 0;

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

function chooseMode(selectedMode) {
    mode = selectedMode;
    document.getElementById("player2Label").style.display = mode === "computer" ? "none" : "block";
    document.getElementById("player2").style.display = mode === "computer" ? "none" : "block";
}

function startGame() {
    player1 = document.getElementById("player1").value || "Player X";
    player2 = mode === "computer" ? "Computer" : (document.getElementById("player2").value || "Player O");
    difficulty = document.getElementById("difficulty").value;
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("status").textContent = `${player1}'s turn (X)`;
    createBoard();
}

function createBoard() {
    let board = document.getElementById("board");
    board.innerHTML = "";
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;
    clickSound.play();

    if (checkWin()) {
        document.getElementById("status").textContent = `${currentPlayer === "X" ? player1 : player2} wins!`;
        winSound.play();
        confetti({ particleCount: 100, spread: 70 });
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        document.getElementById("status").textContent = "It's a draw!";
        drawSound.play();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").textContent = `${currentPlayer === "X" ? player1 : player2}'s turn (${currentPlayer})`;

    if (mode === "computer" && currentPlayer === "O" && gameActive) {
        setTimeout(() => computerMove(), 500);
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent !== "" &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return cells.every(cell => cell.textContent !== "");
}

function computerMove() {
    let availableCells = cells.filter(cell => cell.textContent === "");
    if (availableCells.length > 0) {
        let move;
        if (difficulty === "easy") {
            move = availableCells[Math.floor(Math.random() * availableCells.length)];
        } else if (difficulty === "medium") {
            move = getMediumMove();
        } else if (difficulty === "hard") {
            move = getHardMove();
        }
        move.textContent = "O";
        clickSound.play();

        if (checkWin()) {
            document.getElementById("status").textContent = `${player2} wins!`;
            winSound.play();
            confetti({ particleCount: 100, spread: 70 });
            updateScore("O");
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            document.getElementById("status").textContent = "It's a draw!";
            drawSound.play();
            gameActive = false;
            return;
        }

        currentPlayer = "X";
        document.getElementById("status").textContent = `${player1}'s turn (X)`;
    }
}

function updateScore(winner) {
    if (winner === "X") {
        scoreX++;
        document.getElementById("scoreX").textContent = `Player X: ${scoreX}`;
    } else if (winner === "O") {
        scoreO++;
        document.getElementById("scoreO").textContent = `Player O: ${scoreO}`;
    }
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").textContent = `${player1}'s turn (X)`;
    createBoard();
}