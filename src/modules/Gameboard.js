function Gameboard() {
    let board = [];
    const initialize = () => {
        for (let xPosition = 0; xPosition < 10; xPosition++) {
            for (let yPosition = 0; yPosition < 10; yPosition++) {
                board.push({ position: { x: xPosition, y: yPosition } })
            }
        }
    }
    const getBoard = () => board;
    const placeShip = (ship, position, axis) => {
        let shipSpace = [position];

        for (let shipLength = ship.getLength(); shipLength > 1; shipLength--) {
            let newPosition = {};
            Object.assign(newPosition, position)
            newPosition[axis]++;
            shipSpace.push(newPosition);
        }

        let newBoard = [...board]

        let shipSpaceIndexes = shipSpace.map(space => board.findIndex(box => box.position.x === space.x && box.position.y === space.y))
        shipSpaceIndexes.forEach(index => newBoard[index].ship = ship);
        
        board = newBoard;
    }
    const recieveAttack = (position) => {

    }

    return { placeShip, initialize, getBoard }
}

module.exports = Gameboard;