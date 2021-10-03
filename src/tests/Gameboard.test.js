const Gameboard = require('../modules/Gameboard');
const Ship = require('../modules/Ship');

describe('Gameboard factory function', () => {
    const myGameboard = Gameboard();
    const myShip = Ship(2);
    myGameboard.initialize();

    it('creates a gameboard', () => {
        expect(myGameboard instanceof Object).toBeTruthy();
        expect(myGameboard.getBoard().length).toBe(100)
    })

    it('places a ship', () => {
        myGameboard.placeShip(myShip, { x: 0, y: 0 }, 'y');
        const occupiedBoxes = myGameboard.getBoard()
            .filter(box => box.ship === myShip);
        expect(occupiedBoxes).toEqual(
            [
                { position: { x: 0, y: 0 }, ship: myShip },
                { position: { x: 0, y: 1 }, ship: myShip }
            ]
        )
    })
})