const logger = require('winston');

class ElevatorController {
    constructor(elevatQty, floors) {
        this.floors = floors;
        this.elevators = [];
        for (let i = 0; i < elevatQty; i++) {
          this.elevators.push(new Elevator(1, i, floors));
        }
    }

    callElevator(curFloor, direction) {
      // request always assigned to first elevator (for now)
      // TO DO: add elevator request assignment logic
      this.elevators[0].goToFloor(curFloor, direction);
    }
}

class Elevator {
    constructor(startFloor, elevNum, floors) {
        this.elevatorNumber = elevNum;
        this.curFloor = startFloor;
        this.trips = 0;
        this.floorsTraveled = 0;
        this.totalFloors = floors;
    }

    setCurFloor(curFloor) {
      this.curFloor = curFloor;
    }

    getCurFloor() {
      return this.curFloor;
    }

    incrementTrips() {
        this.trips++;
    }

    incrementFloors() {
        this.floorsTraveled++;
    }

    getTrips() {
        return this.trips;

    }

    // Requirement #6: Request can be made to go to any floor from any floor
    elevatorRequest(destFloor) {
        // logic
        const curFloor = this.getCurFloor();
        const direction = (destFloor > curFloor) ? 'up' : 'down';
        goToFloor(curFloor, destFloor, direction);
    }

    goToFloor(curFloor, destFloor, direction) {
        if (direction == 'up') {
          let steps = destFloor - curFloor;
          for (let i = 1; i < steps + 1; i++) {
              // track and report current elevator location
              let currentFloor = curFloor + i;
              setCurFloor(currentFloor);
              this.incrementFloors();
              // Requirement #2: Report at each floor
              logger.info(`Elevator is at floor ${currentFloor}`);
              // check at each floor to see if it is the destination
              if(currentFloor == destFloor) {
                  // Requirement #3: Report when doors open / close
                  logger.info(`Arrived at floor ${destFloor} - doors opening`);
                  this.incrementTrips();
                  logger.info(`Doors closing`);
                  break;
              }
              // Requirement #4: Elevator cannot proceed above top floor
              if(currentFloor == this.floors) {
                  break;
              }
          }
        }else {
          // 'Down' logic 
          // Requirement #5: Elevator cannot proceed below bottom floor
          // check for bottom floor
        }
    }
}

// Requirement #1: Initialize elevator
let ec = new ElevatorController(2, 10);
ec.callElevator(2,'up');