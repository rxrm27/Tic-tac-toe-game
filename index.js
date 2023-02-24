//function for shortform
function elementID(id) {
  return document.getElementById(id);
}

//access player names and start the game
let playerName1;
let playerName2;

//startbutton
elementID("startButton").addEventListener("click", () => {
  playerName1 = elementID("p1").value;
  playerName2 = elementID("p2").value;
  document.querySelector(".playerO").innerHTML = playerName1 + "'s Turn";
  document.querySelector(".playerX").innerHTML = playerName2 + "'s Turn";
  if (playerName1 == "") {
    alert("Enter Player 1 name");
  } else if (playerName2 == "") {
    alert("Enter Player 2 name");
  } else {
    document.querySelector(".register").classList.add("inactive");
  }
});

//declaration of variables and array
const playerO = "O";
const playerX = "X";
let toggle = true;
let currentPlayer;
const result = document.querySelector(".result");
const showResultText = document.querySelector(".result h1");
const restart = document.getElementById("start");
const cellElements = Array.from(document.getElementsByClassName("cell")); //Acess elements and put them in array

//access elements and append click event
cellElements.forEach((cell) => {
  cell.addEventListener("click", () => {
    cell.classList.add("disabled"); //add disable class after click
    //player input  and toggle
    currentPlayer = toggle ? playerO : playerX; //assigning of player handle
    cell.innerHTML = currentPlayer; //assigned value in html i.e. x or o
    cell.classList.add(currentPlayer); //assigned class of current player for win check to classList

    //check winner
    if (checkWin()) {
      ShowResult(); //removes inactive class
      if (currentPlayer == "O") {
        showResultText.innerHTML = `${playerName1} is the winner`;
      } else {
        showResultText.innerHTML = `${playerName2} is the winner`;
      }
    } else if (isTie()) {
      ShowResult();
      showResultText.innerHTML = `No body won`;
    } else {
      swapPlayer(); //if no winner, Swap the player for next turn
    }
  });
});

//function to swap players
function swapPlayer() {
  if (!toggle) {
    document.querySelector(".playerO").classList.add("active");
    document.querySelector(".playerX").classList.remove("active");
  } else {
    document.querySelector(".playerX").classList.add("active");
    document.querySelector(".playerO").classList.remove("active");
  }
  toggle = !toggle;
}

//define win logic

const winningCondition = [
  [0, 1, 2], //index numbers of cellElements
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to check winningConditions
function checkWin() {
  //some() - require atleast one condition to be true - will return bool value
  return winningCondition.some((condition) => {
    //every() - require all condition to be true - will return bool value
    return condition.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

//function incase of draw
function isTie() {
  return cellElements.every((x) => {
    return x.classList.contains(playerO) || x.classList.contains(playerX);
  });
}

//remove inactive class from result
function ShowResult() {
  result.classList.remove("inactive");
}

restart.onclick = () => {
  elementID("p1").value = "";
  elementID("p2").value = "";
  location.reload();
};
