const randomColor = () => {
  return color(
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  );
}

class Game {
  constructor (players = []) {
    this.players = players;
    this.reset();
  }

  get winner() { 
    let winner = null;

    for (const player of this.players) {
      if (player.box === this.board.totalBoxes)
        return player;
    }
    return winner;
  }

  addPlayer(player) { this.players.push(player); } 

  /* P5 */
  playTurn(speed = 1) {
    if (this.turn.playing && this.winner === null) {
      const player = this.players[this.turn.count % this.players.length];
      display(`${player.name}'s turn. Dice num: ${this.dice.face}`);

      if (this.turn.movingTo === null && this.turn.steps > 0) {
        this.turn.nextBox = player.box + 1;
        this.turn.movingTo = this.board.boxToVector(this.turn.nextBox);
      } else {
        const pos = this.board.boxToVector(player.box);
        let xStep = (pos.x - this.turn.movingTo.x) * speed;
        let yStep = (pos.y - this.turn.movingTo.y) * speed;

        if (player.position.sub(this.turn.movingTo) > 1) {
          player.position.add(xStep, yStep, 0);
        } else {
          player.move();
          player.position = this.board.boxToVector(player.box);
          this.turn.steps--;
          this.turn.movingTo = null;
          this.turn.nextBox = -1;
        }
      }

      // Ending turn
      if (this.turn.steps === 0) {
        this.checkSnakeOrLadder(player);
        this.turn.playing = false;
        this.movingTo = null;
      }
    } else if (this.winner === null) { 
      this.turn.playing = true;
      this.turn.count++;
      this.turn.steps = this.dice.roll();
    } else if (this.winner !== null)
      display(`The winner is ${this.winner.name}!`);
  }

  checkSnakeOrLadder(player) {
    // Checking snakes
    for (const snake of this.board.snakes) {
      if (snake.end === player.box) {
        player.box = snake.start;
        player.position = this.board.boxToVector(player.box);
      }
    }

    // Checking ladders
    for (const ladder of this.board.ladders) {
      if (ladder.start === player.box) {
        player.box = ladder.end;
        player.position = this.board.boxToVector(player.box);
      }
    }
  }

  reset() {
    this.board = new Board(10, 10, 6, 6);
    this.dice = new Dice();
    this.turn =  { count: -1, playing: false, steps: 0, nextBox: -1, movingTo: null, }
    for (const player of this.players) {
      if (player instanceof Player) {
        player.color = randomColor();
        player.box = 1;
        player.position = this.board.boxToVector(player.box);
      }
    }
  }

  /* P5 */
  drawBoard() {
    let fontSize = 20;
    stroke(0);
    textSize(fontSize);
    for (let y = 0; y < this.board.height; y++) {
      for (let x = 0; x < this.board.height; x++) {
        fill(255);
        rect(x * this.board.boxSize, y * this.board.boxSize, this.board.boxSize, this.board.boxSize);
        fill(0);
        let maxX = this.board.width - 1 + this.board.width * (this.board.height - y - 1) + 1
        let cX = x + this.board.width * (this.board.height - y - 1) + 1;
        let message = (y % 2 === 0) ? `${maxX - x}` : `${cX}`;
        text(message, x * this.board.boxSize + this.board.boxSize / 2 - fontSize / 2, y * this.board.boxSize + this.board.boxSize / 2 + fontSize / 2);
      }
    }

    this.drawEntities(this.board.ladders, color(188, 111, 11));
    this.drawEntities(this.board.snakes, color(106, 186, 14));
    this.drawPlayers();
  }

  drawEntities(entities, color) {
    for (const entity of entities) {
      let start = this.board.boxToVector(entity.start);
      let end = this.board.boxToVector(entity.end);

      stroke(color);
      strokeWeight(2);
      line(start.x, start.y, end.x, end.y);
    }
  }

  drawPlayers() {
    for (const player of this.players) {
      const pos = player.position;

      stroke(0);
      strokeWeight(2);
      fill(player.color);
      ellipse(pos.x, pos.y, this.board.boxSize / 3);
      fill(0);
      textSize(18);
      text(player.name, pos.x - this.board.boxSize / 2, pos.y + this.board.boxSize / 3 + 4);
    }
  }
}