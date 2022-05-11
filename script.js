const gameContainer = document.getElementById("game");
let card1;
let card2;
let clickedTimes = 0;
let matchCounter = 0;
let divs = document.getElementsByClassName("div");
let divId1 = -1;
let divId2 = -2;
let loading = document.getElementsByClassName("loading");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const matchedIds = [];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  let divCounter = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("id", divCounter);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    divCounter++;
  }
}

function handleCardClick(event) {
  const target = event.target;
  let targetStr = target.outerHTML.toString();
  let targetStrSliced = targetStr.slice(11);
  let finalTarget = targetStrSliced.split(" ");
  let color = finalTarget[0];
  color = color.substr(1, color.length - 2);
  let divId = finalTarget[1].substr(4, 1);

  if (clickedTimes === 0) {
    card1 = color;
    divId1 = divId;
  } else if (clickedTimes === 1) {
    card2 = color;
    divId2 = divId;
    clickedTimes = -1;
    if (card1 === card2) {
      if (divId1 != divId2) {
        if (
          !matchedIds.includes(Number(divId1)) ||
          !matchedIds.includes(Number(divId2))
        ) {
          matchCounter++;
          matchedIds.push(Number(divId1), Number(divId2));
        }
      }
    }
    if (card1 != card2) {
      gameContainer.setAttribute("class", "loading");

      setTimeout(function () {
        document.getElementById(divId1).style.backgroundColor = "";
        document.getElementById(divId2).style.backgroundColor = "";
        gameContainer.removeAttribute("class", "loading");
      }, 1000);
      clickedTimes = -1;
    }
  }
  event.target.style.backgroundColor = color;
  clickedTimes++;
  if (matchCounter == 5) {
    setTimeout(function () {
      alert("winner");
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createDivsForColors(shuffledColors);
});
