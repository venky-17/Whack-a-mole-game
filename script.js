const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const selectLevel = document.querySelector('#level');
const startBtn = document.querySelector('.start');
const highestScore = document.querySelector('#highScore');

let lastHole;
let timeUp = false;
let score = 0;
let scores = [];
const storedScores = localStorage.getItem("scoresRecorded");
if (storedScores) {
  scores = JSON.parse(storedScores);
  highestScore.innerHTML = `High Score: ${Math.max(...scores)}`;
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function pickRandomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  let hole = holes[index];

  if (hole === lastHole || hole.classList.contains('up')) {
    return null; // Skip this hole and try again
  }

  lastHole = hole;
  return hole;
}

function peep() {
  let selectedLevel = selectLevel.value;

  if (selectedLevel === "Easy") {
    let time = randomTime(500, 1500);
    let hole = pickRandomHole(holes);

    if (hole) {
      hole.classList.add('up');

      function peepBack() {
        hole.classList.remove('up');
        if (!timeUp) {
          peep();
        }

        setTimeout(() => {
          peepBack();
        }, time);
      }

      setTimeout(() => {
        peepBack();
      }, time);
    }
  } else if (selectedLevel === "Medium") {
    let time = randomTime(300, 800);
    let hole = pickRandomHole(holes);

    if (hole) {
      hole.classList.add('up');

      function peepBack() {
        hole.classList.remove('up');
        if (!timeUp) {
          peep();
        }

        setTimeout(() => {
          peepBack();
        }, time);
      }

      setTimeout(() => {
        peepBack();
      }, time);
    }
  } else if (selectedLevel === "Difficult") {
    let time = randomTime(200, 600);
    let hole = pickRandomHole(holes);

    if (hole) {
      hole.classList.add('up');

      function peepBack() {
        hole.classList.remove('up');
        if (!timeUp) {
          peep();
        }

        setTimeout(() => {
          peepBack();
        }, time);
      }

      setTimeout(() => {
        peepBack();
      }, time);
    }
  }
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
  scores.push(score);
  const scoreStorage = localStorage.setItem("scoresRecorded", JSON.stringify(scores));
  const retrieveScores = localStorage.getItem("scoresRecorded");
  console.log(retrieveScores);
  highestScore.innerHTML = `High Score: ${Math.max(...scores)}`;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

startBtn.addEventListener('click', startGame);
