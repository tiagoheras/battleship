function Gameboard() {
    let board = [];

    const initialize = () => {
        for (let xPosition = 0; xPosition < 10; xPosition++) {
            for (let yPosition = 0; yPosition < 10; yPosition++) {
                board.push({ position: { x: xPosition, y: yPosition }, hasBeenHit: false })
            }
        }
    }

    initialize();

    const comparePositions = (position1, position2) => position1.x === position2.x && position1.y === position2.y ? true : false;

    const getBoard = () => board;

    const placeShip = (ship, position, axis) => {
        let usedPositions = [position];

        for (let shipLength = ship.getLength(); shipLength > 1; shipLength--) {
            let newPosition = {};
            Object.assign(newPosition, usedPositions[usedPositions.length - 1]);
            newPosition[axis]++;
            usedPositions.push(newPosition);
        }

        if (usedPositions.every(usedPosition => isPositionValidForPlacement(usedPosition))) {
            let newBoard = [...board]

            let boxIndexes = usedPositions.map(usedPosition => board.findIndex(box => comparePositions(box.position, usedPosition)));
            boxIndexes.forEach(index => newBoard[index].ship = ship);

            board = newBoard;
        } else {
            return new Error('Position occupied.')
        }
    }

    const placeShipRandomly = (ship) => {
        let emptyPositions = getEmptyBoxes().map(emptyBox => emptyBox.position);
        let randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
        let randomAxis = ['x', 'y'][Math.round(Math.random())];
        let result = placeShip(ship, randomPosition, randomAxis);
        if (result instanceof Error) {
            placeShipRandomly(ship);
        } else {
            placeShip(ship, randomPosition, randomAxis);
        }
    }

    const recieveAttack = (position) => {
        const positionBox = board.find(box => comparePositions(box.position, position));
        if (positionBox.hasBeenHit) {
            return new Error('Position has already been hit.');
        } else {
            if (positionBox.ship) {
                positionBox.ship.hit();
            }
            positionBox.hasBeenHit = true;
        }
    }

    const getAdjacentBoxes = position => {
        let adjacentPositions = [
            { x: position.x + 1, y: position.y },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x, y: position.y - 1 },
            { x: position.x + 1, y: position.y + 1 },
            { x: position.x - 1, y: position.y - 1 },
            { x: position.x + 1, y: position.y - 1 },
            { x: position.x - 1, y: position.y + 1 }
        ];
        const validAdjacentPositions = adjacentPositions.filter(adjacentPosition => isPositionValid(adjacentPosition));
        return board.filter(box => validAdjacentPositions.some(validAdjacentPosition => comparePositions(validAdjacentPosition, box.position)))
    };

    const isAdjacentToShip = position => getAdjacentBoxes(position).some(adjacentBox => adjacentBox.ship) ? true : false;

    const isPositionValidForPlacement = position => getEmptyBoxes().some(emptyBox => comparePositions(emptyBox.position, position) && !isAdjacentToShip(position))

    const isPositionValid = position => board.some(box => comparePositions(box.position, position));

    const getMissedAttacks = () => board.filter(box => box.hasBeenHit && !box.ship);

    const getEmptyBoxes = () => board.filter(box => !box.ship);

    const getAvailableBoxes = () => board.filter(box => !box.hasBeenHit);

    const areAllShipsSunk = () => {
        const hitShipBoxes = board.filter(box => box.hasBeenHit && box.ship);
        if (hitShipBoxes.length !== 0) {
            return hitShipBoxes.every(box => box.ship.isSunk())
        } else {
            return false
        }
    }

    return { placeShip, initialize, getBoard, recieveAttack, areAllShipsSunk, getMissedAttacks, getAvailableBoxes, placeShipRandomly }
}

module.exports = Gameboard;