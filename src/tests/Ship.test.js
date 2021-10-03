const Ship = require('../modules/Ship');

describe('Ship factory function', () => {
    const myShip = Ship(2);

    it('creates a ship', () => {
        expect(myShip instanceof Object).toBeTruthy();
    })

    it('hits ship', () => {
        myShip.hit(1);
        expect(myShip.getHits()[0]).toBe(1);
    })

    it('sinks ship', () => {
        myShip.hit(2)
        expect(myShip.isSunk()).toBeTruthy();
    })
})