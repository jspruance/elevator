const logger = require('winston');

class ElevatorController {
    constructor(elevatQty, floors) {
        this.floors = floors;
        this.elevators = [];
        for (let i = 0; i < elevatQty; i++) {
          this.elevators.push(new Elevator(1, i));
        }
    }

    callElevator(curFloor, direction) {
      // request always assigned to first elevator (for now)
      this.elevators[0].goToFloor(curFloor, direction);
    }
}

class Elevator {
    constructor(startFloor, elevNum) {
        this.elevatorNumber = elevNum;
        this.curFloor = startFloor;
    }

    goToFloor(destFloor, direction) {
        if (direction == 'up') {
          let steps = destFloor - this.curFloor;
          for (let i = 1; i < steps + 1; i++) {
              let currentFloor = this.curFloor + i;
              logger.info(`Elevator is at floor ${currentFloor}`);
              // check at each floor to see if it is the destination
              if(currentFloor == destFloor) {
                  logger.info(`Arrived at floor ${destFloor} - doors opening`);
              }
          }
        }else {
          // direction == 'down'
        }
    }
}

let ec = new ElevatorController(2, 10);
ec.callElevator(2,'up');