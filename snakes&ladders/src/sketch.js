/* Sketch! */
const players = [
  new Player('Linux'),
  new Player('Windows'),
];
let game;
let pause = false;

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent('canvasContainer');
  game = new Game(players);
  frameRate(10)
}

function draw() {
  game.drawBoard();
  if (!pause) {
    game.playTurn(0.001);
  }
}

const display = str => {
  const d = document.querySelector('#display');
  d.innerHTML = str;
}

document.addEventListener('DOMContentLoaded', () => {
  const rb = document.querySelector('#reset');
  rb.addEventListener('click', () => { game.reset(); });
});

document.addEventListener('DOMContentLoaded', () => {
  const pb = document.querySelector('#pause');
  pb.addEventListener('click', () => { 
    pause = !pause;
    pause ? pb.innerHTML = 'Resume!' : pb.innerHTML = 'Pause!';
  });
});