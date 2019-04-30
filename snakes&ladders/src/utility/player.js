class Player {
  constructor(name) {
    this._name = name;
    this._box = 1;
    this._color = null;
    this._position = null;
  }

  get name() { return this._name; }
  get box() { return this._box; }
  get color() { return this._color; }
  get position() { return this._position; }

  set color(val) { this._color = val; }
  set box(val) { this._box = val; }
  set position(val) { this._position = val; }

  move() {
    this.box++;
  }
}