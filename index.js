const logger = require('winston');

class ElevatorController {
    constructor(elevatQty, floors) {
        this.elevatQty = elevatQty;
        this.floors = floors;
    }
}

class Elevator {
    constructor(startFloor, elevNum) {
        this.elevatorNumber = elevNum;
        this.curFloor = startFloor;
    }
}

let ec = new ElevatorController(2, 10);
logger.info(ec.elevatQty);