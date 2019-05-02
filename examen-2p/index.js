let running = false;
const goal = 100;
const myPlayers = [
  { name: 'Alfonso', steps: 0, moving: 0 },
  { name: 'Poncho', steps: 0, moving: 0 },
  { name: 'Valencia', steps: 0, moving: 0 },
  { name: 'Sandoval', steps: 0, moving: 0 },
  { name: 'Ponchis', steps: 0, moving: 0 },
];

const ssb = document.querySelector('#run'); // start - stop button
ssb.addEventListener('click', () => {
  running = !running;
  running ? ssb.innerHTML = 'Pause!' : ssb.innerHTML = 'Run!';
});

setInterval(() => {
  const winning = winningPlayers(myPlayers, goal);
  if (running && winning.length === 0) {
    for (const player of myPlayers) {
      const steps = getMovingSteps();
      player.moving = steps;
      player.steps += steps;
    }
  
    drawPlayers(myPlayers);
  } else if (winning.length > 0)
    drawWinners(winning);
}, 1000);

const winningPlayers = (players, goal) => {
  let winning = [];
  for (const player of players) {
    if (player.steps >= goal)
      winning.push(player)
  }

  return winning;
}

const drawPlayers = players => {
  const playersBox = document.querySelector('.players');
  let content = '';

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    content += 
      `<div class="player">`
        +`<p class="name">Name: ${player.name}</p>`
        +`<p class="steps">Steps: ${player.steps}</p>`
        +`<p class="moving-steps">Moved: ${player.moving} steps</p>`
      +`</div>`;
  }

  playersBox.innerHTML = content;
}

const getMovingSteps = () => {
  const random = Math.floor(Math.random() * 10 + 1);
  let moving = 0;
  if (random > 0 && random <= 2)
    moving = 1;
  else if (random > 2 && random <= 4)
    moving = -1;
  else if (random > 4 && random <= 8)
    moving = 2;
  else if (random > 8 && random <= 10)
    moving = 3;

  return moving;
}

const drawWinners = winners => {
  const wBox = document.querySelector('#winner');
  let content = '';

  for (let i = 0; i < winners.length; i++) {
    const player = winners[i];
    if (i === winners.length - 1)
      content += ` and ${player.name}`;
    else
      content += `, ${player.name}`;
  }

  if (winners.length > 1)
    content += ' drew!';
  else
    content += ' is the winner!';

  content = content.substr(2);

  wBox.innerHTML = content;
}