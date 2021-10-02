const Ship = require('../modules/Ship');

describe('Ship factory function', () => {
    it('creates a ship', () => {
        expect(Ship(3) instanceof Object).toBeTruthy();
    })

    it('hits ship', () => {
        const myShip = Ship(2);
        myShip.hit(2);
        expect(myShip.hits[0]).toBe(2);
    })

    it('sinks ship', () => {
        const myShip = Ship(2);
        myShip.hit(1)
        myShip.hit(2);
        expect(myShip.isSunk()).toBeTruthy();
    })
})