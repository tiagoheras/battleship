const Gameboard = require("../modules/Gameboard");
const Player = require("../modules/Player")

describe('Player factory function', () => {
    const myPlayer = Player(Gameboard(), false);
    const computerPlayer = Player(Gameboard(), true);

    it('creates a player', () => {
        expect(Player() instanceof Object).toBeTruthy();
    })

    it('attacks an enemy gameboard', () => {
        myPlayer.attack(computerPlayer.getPlayerGameboard(), { x: 0, y: 0 });
        computerPlayer.randomAttack(myPlayer.getPlayerGameboard());
        expect(computerPlayer.getPlayerGameboard().getBoard()[0].hasBeenHit).toBe(true);
        expect(computerPlayer.getPlayerGameboard().getBoard().every(box => !box.hasBeenHit)).toBe(false);
        expect(myPlayer.attack(computerPlayer.getPlayerGameboard(), { x: 0, y: 0 }) instanceof Error).toBe(true);
    })
})