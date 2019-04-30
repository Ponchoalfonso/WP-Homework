class Board {

  constructor(width, height, quantityLadders, quantitySnakes, boxSize = 80) {
    this._widht = width;
    this._height = height;
    this.ladders = [];
    this.snakes = [];
    this.generateBoard(quantityLadders, quantitySnakes);
    this._boxSize = boxSize;
  }

  get width() { return this._widht; }
  get height() { return this._height; }
  get totalBoxes() { return this.width * this.height; }
  get boxSize() { return this._boxSize; }

  generateBoard(quantityLadders, quantitySnakes) {
    const occupied = [];
    for (let i = 0; i < quantityLadders; i++) {
      const spot = this.findSpot(occupied, 2);
      this.ladders.push(spot);
    }
    for (let i = 0; i < quantitySnakes; i++) {
      const spot = this.findSpot(occupied, 3);
      this.snakes.push(spot);
    }
  }

  findSpot(occupied, maxRowHops) {
    let bottom = 0;
    let top = 0;
    let distanceToNextRow = 0;
    let hopLimit = maxRowHops * this.width;

    do {
      bottom = Math.floor(Math.random() * (this.totalBoxes) + 1);
    } while (occupied.indexOf(bottom) !== -1 && occupied.length !== (this.totalBoxes) || bottom === 100 || bottom > (this.totalBoxes - this.width));
    (occupied.indexOf(bottom) !== -1) ? bottom = 0 : occupied.push(bottom);

    distanceToNextRow = (10 - (bottom % this.width + 1)) + 2;
    let topLimit = this.totalBoxes - (bottom + distanceToNextRow);
    let bottomLimit = (bottom + distanceToNextRow);
    if (topLimit - bottomLimit > hopLimit)
      topLimit -= topLimit - bottomLimit;

    do {
      top = Math.floor(Math.random() * topLimit + bottomLimit);
    } while (occupied.indexOf(top) !== -1 && occupied.length !== (this.totalBoxes) || bottom === 100);
    (occupied.indexOf(top) !== -1) ? top = 0 : occupied.push(top);

    return { start: bottom, end: top };
  }

  checkPosition(box) {
    for (spot of this.ladders){
      if (this.spot.start === box)
        return this.spot.end;
    }
    for (spot of this.ladders){
      if (this.spot.end === box)
        return this.spot.start;
    }
    return -1
  }

  /* P5 */
  boxToVector(box) {
    let x = (box % this.width) - 1;
    let y = this.height - 1 - Math.floor(box / this.height);

    if (x === -1) {
      x = this.width - 1;
      y++;
    }

    if (y % 2 === 0 )
      x = this.width - 1 - x;
    
    // console.log(x)
    return createVector(x * this.boxSize + (this.boxSize / 2), y * this.boxSize + (this.boxSize / 2));
  }
}