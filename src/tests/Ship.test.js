const Ship = require('../modules/Ship');

describe('Ship factory function', () => {
    const myShip = Ship(2);

    it('creates a ship', () => {
        expect(myShip instanceof Object).toBeTruthy();
    })

    it('hits ship', () => {
        myShip.hit();
        expect(myShip.getHits()).toBe(1);
    })

    it('sinks ship', () => {
        myShip.hit()
        expect(myShip.isSunk()).toBeTruthy();
    })
})