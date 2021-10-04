const Ship = require("./Ship");

function Gameboard() {
    let board = [];

    const initialize = () => {
        for (let xPosition = 0; xPosition < 10; xPosition++) {
            for (let yPosition = 0; yPosition < 10; yPosition++) {
                board.push({ position: { x: xPosition, y: yPosition }, hasBeenHit: false })
            }
        }
    }

    const comparePositions = (position1, position2) => position1.x === position2.x && position1.y === position2.y ? true : false;

    const getBoard = () => board;

    const placeShip = (ship, position, axis) => {
        let usedPositions = [position];

        for (let shipLength = ship.getLength(); shipLength > 1; shipLength--) {
            let newPosition = {};
            Object.assign(newPosition, position)
            newPosition[axis]++;
            usedPositions.push(newPosition);
        }

        let newBoard = [...board]

        let positionIndexes = usedPositions.map(usedPosition => board.findIndex(box => comparePositions(box.position, usedPosition)))
        positionIndexes.forEach(index => newBoard[index].ship = ship);

        board = newBoard;
    }

    const recieveAttack = (position) => {
        const positionBox = board.find(box => comparePositions(box.position, position));
        if (positionBox.hasBeenHit) {
            return new Error();
        } else {
            if (positionBox.ship) {
                positionBox.ship.hit();
                
            }
            positionBox.hasBeenHit = true;
        }
    }

    const areAllShipsSunk = () => {
        return board.filter(box => box.hasBeenHit && box.ship).every(filteredBox => filteredBox.ship.isSunk())
    };

    return { placeShip, initialize, getBoard, recieveAttack, areAllShipsSunk }
}

module.exports = Gameboard;