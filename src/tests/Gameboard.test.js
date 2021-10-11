const Gameboard = require('../modules/Gameboard');
const Ship = require('../modules/Ship');

describe('Gameboard factory function', () => {
    const myGameboard = Gameboard();
    const myShip = Ship(2);
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
        expect(myGameboard.placeShip(myShip, { x: 0, y: 9 }, 'y') instanceof Error).toBe(true)
    })

    it('places ships randomly', () => {
        const randomGameboard = Gameboard();
        let ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2), Ship(2)];
        ships.forEach(ship => randomGameboard.placeShipRandomly(ship));
        const occupiedBoxes = randomGameboard.getBoard().filter(box => ships.some(ship => ship === box.ship));
        expect(occupiedBoxes.length).toBe(19);
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

    it('gets missed attacks', () => {
        myGameboard.recieveAttack({ x: 4, y: 7 })
        expect(myGameboard.getMissedAttacks()).toStrictEqual([
            { position: { x: 4, y: 7 }, hasBeenHit: true },
        ])
    })

    it('gets available boxes', () => {
        expect(myGameboard.getAvailableBoxes() instanceof Array).toBeTruthy()
    })
})