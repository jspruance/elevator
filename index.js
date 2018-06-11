const logger = require('winston');

class ElevatorController {
    constructor(elevatQty, floors) {
        this.floors = floors;
        this.elevators = [];
        for (let i = 0; i < elevatQty; i++) {
          this.elevators.push(new Elevator(1, i, floors));
        }
    }

    // Requirement #7: Elevator requests - assign request to appropriate elevator
    // TO DO: check if elevator is in 'MAINTENANCE' mode before assigning request
    callElevator(curFloor, direction) {
      let assignedElevator;
      // iterate through elevators, filter by unoccupied, sort to find closest
      let candidateElevators = this.elevators.filter((elevator) => {
        let occ = elevator.getOccupied();
        return occ == false;
      });
      candidateElevators.sort(function (a, b) {
        return a.getCurFloor() - b.getCurFloor();
      });

      // is unoccupied elevator already stopped at that floor?
      candidateElevators.map((elevator) => {
        if(elevator.getCurFloor() == curFloor) {
          assignedElevator = elevator;
          // TO DO: further refine to choose closest if multiple elevators currently at floor
        }
      });

      if(!assignedElevator) {
        // will occupied elevator pass floor en route to destination?
        let occupiedElevators = this.elevators.filter((elevator) => {
            let occ = elevator.getOccupied();
            return occ == true;
        });
        this.occupiedElevators.map((elevator) => {
          // STUB: determine if elevator will pass requested floor
          // need to expose more status info from Elevator class
          assignedElevator = elevators;
        });
      }else {
          // assign request to closes unoccupied elevator
          assignedElevator = candidateElevators[0];
      }

      // finally send request to selected elevator
      assignedElevator.goToFloor(curFloor, direction);
    }
}

class Elevator {
    constructor(startFloor, elevNum, floors) {
        this.elevatorNumber = elevNum;
        this.curFloor = startFloor;
        this.trips = 0;
        this.floorsTraveled = 0;
        this.totalFloors = floors;
        this.occupied = false;
        this.status = 'ACTIVE';
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    setCurFloor(curFloor) {
      this.curFloor = curFloor;
    }

    getCurFloor() {
      return this.curFloor;
    }

    setOccupied(occupied) {
        this.occupied = occupied;
      }
  
    getOccupied() {
        return this.occupied;
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
        setOccupied(true);
        const curFloor = this.getCurFloor();
        const direction = (destFloor > curFloor) ? 'up' : 'down';
        goToFloor(curFloor, destFloor, direction);
        // TO DO: promisify goToFloor so that timing of setOccupied(false) is accurate
        setOccupied(false);
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
                  logger.info(`Doors closing`);
                  this.incrementTrips();
                  // Requirement #8: If 100 trips - take out of service
                  let curStatus = getStatus();
                  if(curStatus >= 100) {
                      setStatus('MAINTENANCE');
                  }
                  break;
              }
              // Requirement #4: Elevator cannot proceed above top floor
              if(currentFloor == this.floors) {
                  break;
              }
          }
        }else {
          // 'Down' logic - similar to 'up'. Some code can likely be factored out.
          // Requirement #5: Elevator cannot proceed below bottom floor
          // check for bottom floor
        }
    }
}

// Requirement #1: Initialize elevator
let ec = new ElevatorController(2, 10);
ec.callElevator(2,'up');