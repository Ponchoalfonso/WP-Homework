import Elevator from './elevator';

const myElevator = new Elevator(10);
let i = 0;
let queue = [0, 4, 6, 8, 10, 5];

setInterval(() => {
  const nextFloor = queue[i % (queue.length - 1)];
  if (myElevator.currentFloor === nextFloor) {
    console.log('Ding! You are in floor '+ nextFloor);
    i++;
  }
  console.log(`Next floor: ${nextFloor}`)
  myElevator.goTo(nextFloor);
  console.log(`Door: ${myElevator.isDoorOpen ? 'open' : 'closed'} \nElevator current floor: ${myElevator.currentFloor}\n`);
}, 1000);