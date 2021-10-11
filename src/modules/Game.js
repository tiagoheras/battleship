const Gameboard = require("./Gameboard");
const Player = require("./Player");
const Ship = require("./Ship");

function Game() {
    let round = 0;
    let ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2), Ship(2)]
    const playerGameboard = Gameboard();
    playerGameboard.placeShip(ships[0], { x: 0, y: 0 }, 'y')
    playerGameboard.placeShip(ships[1], { x: 5, y: 0 }, 'x')
    playerGameboard.placeShip(ships[2], { x: 5, y: 6 }, 'x')
    playerGameboard.placeShip(ships[3], { x: 2, y: 6 }, 'y')
    playerGameboard.placeShip(ships[4], { x: 8, y: 9 }, 'x')
    playerGameboard.placeShip(ships[5], { x: 6, y: 3 }, 'x')

    const computerGameboard = Gameboard();
    ships.forEach(ship => {
        computerGameboard.placeShip(ship, )
    })
    const computerPlayer = Player(computerGameboard, true);
}