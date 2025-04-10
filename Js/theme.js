const board = document.getElementById('board');
const statusText = document.getElementById('game-status');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive || currentPlayer !== 'X') return;

  makeMove(index, 'X');
  if (checkEndGame()) return;

  // Lancer le bot après un petit délai
  setTimeout(botMove, 500);
}

function makeMove(index, player) {
  gameState[index] = player;
  board.children[index].textContent = player;
}

function botMove() {
  if (!gameActive) return;

  const emptyIndices = gameState
    .map((val, idx) => val === "" ? idx : null)
    .filter(idx => idx !== null);

  if (emptyIndices.length === 0) return;

  const botIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(botIndex, 'O');
  checkEndGame();
}

function checkEndGame() {
  if (checkWin('X')) {
    statusText.textContent = "Vous avez gagné ! 🎉";
    gameActive = false;
    return true;
  }

  if (checkWin('O')) {
    statusText.textContent = "Le bot a gagné ! 🤖";
    gameActive = false;
    return true;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "Match nul !";
    gameActive = false;
    return true;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Au tour du joueur ${currentPlayer}`;
  return false;
}

function checkWin(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(([a, b, c]) =>
    gameState[a] === player &&
    gameState[b] === player &&
    gameState[c] === player
  );
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Joueur ${currentPlayer} commence`;
  createBoard();
}

document.addEventListener('DOMContentLoaded', () => {
  createBoard();
  statusText.textContent = "Joueur X commence";
});
document.addEventListener("DOMContentLoaded", () => {
  
  const cartesProjets = document.querySelectorAll(".carte-projet");

  function setupHoverEffect(cartes) {
    cartes.forEach((carte, index) => {
      carte.addEventListener("mouseenter", () => {
        carte.classList.add("carte-hover");

        cartes.forEach((autreCarte, autreIndex) => {
          if (autreIndex !== index) {
            autreCarte.style.transform = "scale(0.98)";
            autreCarte.style.opacity = "0.8";
            autreCarte.style.filter = "blur(1px)";
          }
        });
      });

      carte.addEventListener("mouseleave", () => {
        carte.classList.remove("carte-hover");
        cartes.forEach((autreCarte) => {
          autreCarte.style.transform = "";
          autreCarte.style.opacity = "";
          autreCarte.style.filter = "";
        });
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});

const chat = document.getElementById("chat");

    function moveChatRandomly() {
      const maxX = window.innerWidth - chat.offsetWidth;
      const maxY = window.innerHeight - chat.offsetHeight;

      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);

      chat.style.left = `${randomX}px`;
      chat.style.top = `${randomY}px`;
    }

    chat.addEventListener("mouseenter", moveChatRandomly);

    // Position initiale
    window.onload = moveChatRandomly;
