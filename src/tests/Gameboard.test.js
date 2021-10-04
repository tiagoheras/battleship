const Gameboard = require('../modules/Gameboard');
const Ship = require('../modules/Ship');

describe('Gameboard factory function', () => {
    const myGameboard = Gameboard();
    const myShip = Ship(2);
    myGameboard.initialize();
    myGameboard.placeShip(myShip, { x: 0, y: 0 }, 'y');

    it('creates a gameboard', () => {
        expect(myGameboard instanceof Object).toBeTruthy();
        expect(myGameboard.getBoard().length).toBe(100)
    })

    it('places a ship', () => {
        const occupiedBoxes = myGameboard.getBoard()
            .filter(box => box.ship === myShip);
        expect(occupiedBoxes).toEqual(
            [
                { position: { x: 0, y: 0 }, ship: myShip, hasBeenHit: false },
                { position: { x: 0, y: 1 }, ship: myShip, hasBeenHit: false }
            ]
        )
    })

    it('recieves attack', () => {
        myGameboard.recieveAttack({ x: 0, y: 0 });
        expect(myShip.getHits()).toBe(1);

        myGameboard.recieveAttack({ x: 0, y: 1 });
        expect(myShip.getHits()).toBe(2)
        expect(myShip.isSunk()).toBeTruthy();

        expect(myGameboard.recieveAttack({ x: 0, y: 0 }) instanceof Error).toBeTruthy()
    })

    it('checks wether all ships are sunk', () => {
        myGameboard.recieveAttack({ x: 0, y: 0 });
        myGameboard.recieveAttack({ x: 0, y: 1 });
        expect(myGameboard.areAllShipsSunk()).toBeTruthy();
    })
})