export default class Elevator {
  private _currentFloor: number;
  private totalFloors: number;
  private doorState: boolean;

  constructor(totalFloors: number) {
    this.totalFloors = totalFloors;
    this.doorState = true;
    this._currentFloor = 0;
  }

  get currentFloor() { return this._currentFloor; }
  get isDoorOpen() { return this.doorState; }

  private goDown(): void { this._currentFloor--; }
  private goUp(): void { this._currentFloor++; }
  
  private closeDoor(): void { this.doorState = false; }
  private openDoor(): void { this.doorState = true; }

  public goTo(floor: number): void {
    if (floor <= this.totalFloors && floor >= 0) {
      if (this.doorState)
        this.closeDoor();
      else if (floor > this._currentFloor)
        this.goUp();
      else if (floor < this._currentFloor)
        this.goDown();
      else
        this.openDoor();
      }
  }

  public emergency(): void { this.openDoor(); }
}