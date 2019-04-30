class Dice {
  constructor(faces = 6) {
    this._face = 1;
    this._faces = faces;
  }

  get face() { return this._face; }
  get faces() { return this._faces; }

  roll() {
    this._face = Math.floor(Math.random() * this.faces + 1);
    return this.face;
  }
}