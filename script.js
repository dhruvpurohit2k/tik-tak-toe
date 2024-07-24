let cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let playerPlaying = true;
let player = "X";
let bot = "O";
let movesremaining = 9;
let drawFlag = false;
let rule = {
  player: -1,
  bot: +1,
  tie: 0,
};



let playericon = document.createElement("img");
playericon.setAttribute("src", "./svg/cross.svg");
let boticon = document.createElement("img");
boticon.setAttribute("src", "./svg/circle.svg");

let gameCellsArray = document.querySelectorAll(".gamecell");
let winmodal = document.querySelector("dialog");
let playerscore = document.querySelector("#player-score");
let botscore = document.querySelector("#bot-score");
let player1 = document.querySelectorAll(".scorecard")[0];
let player2 = document.querySelectorAll(".scorecard")[1];

gameCellsArray.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    console.log(index);
    cellClicked(ele, index);
  })
})

player1.classList.add("active");

function winning(cells, player) {
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

function resetBoard() {
  gameCellsArray.forEach((ele, index) => {
    ele.innerHTML = "";
    cells[index] = index;
  })
  console.log(cells);
}

function cellClicked(ele, index) {
  if (cells[index] == player || cells[index] == bot) {
    return;
  }
  if (playerPlaying) {
    ele.appendChild(playericon.cloneNode(true));
    cells[index] = player;
    movesremaining--;
    playerPlaying = !playerPlaying;
    player1.classList.remove("active");
    player2.classList.add("active");
  } else {
    ele.appendChild(boticon.cloneNode(true));
    cells[index] = bot;
    movesremaining--;
    playerPlaying = !playerPlaying;
    player2.classList.remove("active");
    player1.classList.add("active");
  }
  if (winning(cells, player)) {
    winEvent('player');
  }
  else if (winning(cells, bot)) {
    winEvent('bot');
  }
  if (movesremaining == 0) {
    drawFlag = true;
    winEvent('tie');

  }
}
function winEvent(gameResult) {
  if (gameResult == 'tie') {
    winmodal.querySelector("#dialogtext").textContent = "DRAW";
    winmodal.showModal();
    drawFlag = false;
  } else if (gameResult == 'player') {
    winmodal.querySelector("#dialogtext").textContent = "PLAYER X WON";
    winmodal.showModal();
    playerscore.textContent = Number(playerscore.textContent) + 1;
  } else {
    winmodal.querySelector("#dialogtext").textContent = "PLAYER O WON";
    winmodal.showModal();
    botscore.textContent = Number(botscore.textContent) + 1;
  }
  setTimeout(() => {
    movesremaining = 9;
    winmodal.close();
    resetBoard();
  }, 1000);
}



// function getAiMove(ele, index) {
//   for (let i = 0; i < cells.length; i++) {
//     if (cells[i] !== player && cells[i] !== bot) {
//       // gameCellsArray[i].appendChild(boticon.cloneNode(true));
//       // cells[i] = bot;
//       // movesremaining--;
//       // break;
//     }
//   }
// }

// //Using the minmax algorithm to provide bot support 

// function minimax(cells, player) {
//   if (winning(cells, player) || player == 'tie') {
//     return rule[player];
//   }

// }