const Game = require("../modules/Game");
const Gameboard = require("../modules/Gameboard");
const Player = require("../modules/Player")

describe('Player factory function', () => {
	const computerGameboard = Gameboard();
	const playerGameboard = Gameboard();

    const myPlayer = Player(playerGameboard, false);
    const computerPlayer = Player(computerGameboard, true);

    it('creates a player', () => {
        expect(Player() instanceof Object).toBeTruthy();
    })

    it('gets players gameboard', () => {
        expect(myPlayer.getPlayerGameboard()).toBe(playerGameboard);
    })

    it('knows if player is computer', () => {
        expect(myPlayer.getIsComputer()).toBe(false)
        expect(computerPlayer.getIsComputer()).toBe(true)
    })

    it('attacks an enemy gameboard', () => {
        myPlayer.attack(computerGameboard, { x: 0, y: 0 });
        computerPlayer.randomAttack(playerGameboard);
        expect(computerGameboard.getBoard()[0].hasBeenHit).toBe(true);
        expect(computerGameboard.getBoard().every(box => !box.hasBeenHit)).toBe(false);
        expect(myPlayer.attack(computerGameboard, { x: 0, y: 0 }) instanceof Error).toBe(true);
    })
})