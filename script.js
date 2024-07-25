

// player1.classList.add("active");

// function winning(cells, player) {
//   if (
//     (cells[0] == player && cells[1] == player && cells[2] == player) ||
//     (cells[3] == player && cells[4] == player && cells[5] == player) ||
//     (cells[6] == player && cells[7] == player && cells[8] == player) ||
//     (cells[0] == player && cells[3] == player && cells[6] == player) ||
//     (cells[1] == player && cells[4] == player && cells[7] == player) ||
//     (cells[2] == player && cells[5] == player && cells[8] == player) ||
//     (cells[0] == player && cells[4] == player && cells[8] == player) ||
//     (cells[2] == player && cells[4] == player && cells[6] == player)
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function resetBoard() {
//   gameCellsArray.forEach((ele, index) => {
//     ele.innerHTML = "";
//     cells[index] = index;
//   })
//   console.log(cells);
// }

// function cellClicked(ele, index) {
//   if (cells[index] == player || cells[index] == bot) {
//     return;
//   }
//   if (playerPlaying) {
//     ele.appendChild(playericon.cloneNode(true));
//     cells[index] = player;
//     movesremaining--;
//     playerPlaying = !playerPlaying;
//     player1.classList.remove("active");
//     player2.classList.add("active");
//   } else {
//     ele.appendChild(boticon.cloneNode(true));
//     cells[index] = bot;
//     movesremaining--;
//     playerPlaying = !playerPlaying;
//     player2.classList.remove("active");
//     player1.classList.add("active");
//   }
//   if (winning(cells, player)) {
//     winEvent('player');
//   }
//   else if (winning(cells, bot)) {
//     winEvent('bot');
//   }
//   if (movesremaining == 0) {
//     drawFlag = true;
//     winEvent('tie');

//   }
// }





let Game = (function () {
  let board;
  let player1Score;
  let player2Score;
  let winmodal;
  let player1Card;
  let player2Card;


  let numberOfMovesRemaining;
  let boardState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let setupDone = false;
  let player1Symbol = "x";
  let player2Symbol = "o";
  let player1 = document.createElement("img");
  player1.setAttribute("src", "./svg/cross.svg");
  let player2 = document.createElement("img");
  player2.setAttribute("src", "./svg/circle.svg");
  let player1chance = true;


  const setBoard = (boardinstance) => { board = boardinstance }
  const getBoard = () => board;
  const setWinModal = (modal) => { winmodal = modal };
  const setPlayerScoreCards = (player1, player2) => {
    player1Card = player1;
    player2Card = player2;
    player1Score = player1.querySelector(".scorecard-points");
    player2Score = player2.querySelector(".scorecard-points");
  }
  const resetBoardState = () => {
    for (let i = 0; i < boardState.length; i++)
      boardState[i] = i;
  }
  const updatePlayerScore = (player) => {
    player.textContent = (player.textContent - 0) + 1;
  };
  const setupGame = (board, player1, player2, modal) => {
    setBoard(board);
    setPlayerScoreCards(player1, player2);
    setWinModal(modal);
    numberOfMovesRemaining = 9;
    setupDone = true;
  }
  const start = (board) => {
    if (!setupDone) {
      alert("Game not Setup");
      return;
    }
    getBoard().forEach((ele, index) => {
      console.log(ele);
      ele.addEventListener("click", () => {
        cellClicked(ele, index);
      })
    });
    player1Card.classList.add("active");

  }
  const cellClicked = (ele, index) => {
    if (Number.isInteger(boardState[index])) {
      if (player1chance) {
        ele.appendChild(player1.cloneNode(true));
        boardState[index] = player1Symbol;
        player1chance = !player1chance;
        numberOfMovesRemaining--;
        player1Card.classList.remove("active");
        player2Card.classList.add("active");
      } else {
        ele.appendChild(player2.cloneNode(true));
        boardState[index] = player2Symbol;
        player1chance = !player1chance;
        numberOfMovesRemaining--;
        player1Card.classList.add("active");
        player2Card.classList.remove("active");
      }
    }
    if (winning(boardState, player1Symbol)) {
      winEvent("player");
    } else if (winning(boardState, player2Symbol)) {
      winEvent("bot");
    } else if (numberOfMovesRemaining == 0) {
      winEvent("tie");
    }
  };
  const winning = (cells, player) => {
    if (
      (cells[0] == player && cells[1] == player && cells[2] == player) ||
      (cells[3] == player && cells[4] == player && cells[5] == player) ||
      (cells[6] == player && cells[7] == player && cells[8] == player) ||
      (cells[0] == player && cells[3] == player && cells[6] == player) ||
      (cells[1] == player && cells[4] == player && cells[7] == player) ||
      (cells[2] == player && cells[5] == player && cells[8] == player) ||
      (cells[0] == player && cells[4] == player && cells[8] == player) ||
      (cells[2] == player && cells[4] == player && cells[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }
  const winEvent = (gameResult) => {
    if (gameResult == 'tie') {
      winmodal.querySelector("#dialogtext").textContent = "DRAW";
      winmodal.showModal();
    } else if (gameResult == 'player') {
      winmodal.querySelector("#dialogtext").textContent = "PLAYER X WON";
      winmodal.showModal();
      updatePlayerScore(player1Score);
    } else {
      winmodal.querySelector("#dialogtext").textContent = "PLAYER O WON";
      winmodal.showModal();
      updatePlayerScore(player2Score);
    }
    setTimeout(() => {
      movesremaining = 9;
      winmodal.close();
      resetBoard();
    }, 1000);
    const resetBoard = () => {
      for (let i = 0; i < 9; i++) {
        boardState[i] = i;
        board[i].innerHTML = '';
      }
      numberOfMovesRemaining = 9;
    }
  }
  return { start, setupGame, resetBoardState, updatePlayerScore }
})();


let gameCellsArray = document.querySelectorAll(".gamecell");
let player1 = document.querySelectorAll(".scorecard")[0];
let player2 = document.querySelectorAll(".scorecard")[1];
let winmodal = document.querySelector("dialog");
console.log(player1, player2);
Game.setupGame(gameCellsArray, player1, player2, winmodal);
Game.start();