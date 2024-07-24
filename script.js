let cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let playerPlaying = true;
let player = "X";
let bot = "O";
let movesremaining = 9;
let drawFlag = false;
let playericon = document.createElement("img");
playericon.setAttribute("src", "./svg/cross.svg");
let boticon = document.createElement("img");
boticon.setAttribute("src", "./svg/circle.svg");

let gameCellsArray = document.querySelectorAll(".gamecell");
let winmodal = document.querySelector("dialog");
let playerscore = document.querySelector("#player-score");
let botscore = document.querySelector("#bot-score");

gameCellsArray[0].appendChild(playericon);
gameCellsArray[1].appendChild(boticon);
gameCellsArray.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    console.log(index);
    cellClicked(ele, index);
    // alert(`clicked cell ${Math.floor(index / 3) + 1},${index % 3 + 1}`);
    //   if (playerPlaying) {
    //     ele.innerHTML = player;
    //     cells[index] = player;
    //   } else {
    //     ele.innerHTML = bot;
    //     cells[index] = bot;
    //   }
    //   playerPlaying = !playerPlaying;
    //   console.log(cells);
    //   if (winning(cells, player)) {
    //     setTimeout(() => {
    //       alert("Player WON!")
    //       resetBoard();
    //     }, 1000);
    //   }
    //   else if (winning(cells, bot)) {
    //     setTimeout(() => {
    //       alert("BOT WON :(")
    //       resetBoard();
    //     }, 1000);
    //   }
  })
})
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
    ele.innerHTML = player;
    cells[index] = player;
    movesremaining--;
  } else {
    ele.innerHTML = bot;
    cells[index] = bot;
    movesremaining--;
  }
  playerPlaying = !playerPlaying;
  console.log(cells);
  if (winning(cells, player)) {
    winEvent(true);
  }
  else if (winning(cells, bot)) {
    winEvent(false);
  } else if (movesremaining == 0) {
    drawFlag = true;
    winEvent(false);

  }

  function winEvent(isplayer) {
    if (drawFlag) {
      winmodal.querySelector("#dialogtext").textContent = "DRAW";
      winmodal.showModal();
      drawFlag = false;
    } else {
      winmodal.querySelector("#dialogtext").textContent = isplayer ? "PLAYER WON" : "BOT WON";
      winmodal.showModal();
      if (isplayer) {
        playerscore.textContent = Number(playerscore.textContent) + 1;
      } else {
        botscore.textContent = Number(botscore.textContent) + 1;
      }
    }

    setTimeout(() => {
      movesremaining = 9;
      winmodal.close();
      resetBoard();
    }, 1000);
  }
}