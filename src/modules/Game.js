const Gameboard = require('../modules/Gameboard');
const Player = require('../modules/Player');
const Ship = require('../modules/Ship');


const Game = (function () {
    let player;
    let computer;

    const initialize = () => {
        const computerGameboard = Gameboard();
        const playerGameboard = Gameboard();

        player = Player(playerGameboard, false);
        computer = Player(computerGameboard, true);

        UI.renderShipPlacementScreen(playerGameboard, [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2), Ship(2)]);
        computerGameboard.placeShipsRandomly([Ship(5), Ship(4), Ship(3), Ship(3), Ship(2), Ship(2)]);
    }

    const checkWinner = () => {
        if (player.getPlayerGameboard().areAllShipsSunk() && !computer.getPlayerGameboard().areAllShipsSunk()) {
            return UI.displayResult('computer wins');
        } else if (!player.getPlayerGameboard().areAllShipsSunk() && computer.getPlayerGameboard().areAllShipsSunk()) {
            return UI.displayResult('player wins');
        } else if (player.getPlayerGameboard().areAllShipsSunk() && computer.getPlayerGameboard().areAllShipsSunk()) {
            return UI.displayResult('tie');
        } else {
            return false;
        }
    }

    const playRound = (position) => {
        player.attack(computer.getPlayerGameboard(), position);
        computer.randomAttack(player.getPlayerGameboard());
        renderBoards();
        checkWinner();
    }

    const renderBoards = () => {
        UI.clearBoards();
        UI.renderPlayerBoard(player);
        UI.renderPlayerBoard(computer);
    }

    return { initialize, playRound, renderBoards }
})()

const UI = (function () {
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');

    const listenForAttack = (e) => {
        let position = JSON.parse(e.target.dataset.position);
        Game.playRound(position);
    }

    const renderShipPlacementScreen = (playerGameboard, ships) => {
        const placingBoardContainer = document.createElement('div');

        const placingBoard = document.createElement('div');
        placingBoardContainer.id = 'placing-board-container';
        placingBoard.className = 'board';

        let axis = 'x';

        const axisBtn = document.createElement('button');
        axisBtn.innerText = 'Toggle Axis';
        axisBtn.addEventListener('click', () => {
            axis === 'x' ? axis = 'y' : axis = 'x';
        })

        let shipIndex = 0;

        playerGameboard.getBoard().forEach(box => {
            const boxDiv = document.createElement('div');
            boxDiv.className = 'box';
            boxDiv.dataset.position = JSON.stringify(box.position);

            boxDiv.addEventListener('click', (e) => {
                const position = JSON.parse(e.target.dataset.position);

                if (playerGameboard.placeShip(ships[shipIndex], position, axis) instanceof Error) {
                    alert('Invalid position');
                } else {
                    playerGameboard.placeShip(ships[shipIndex], position, axis);
                    playerGameboard.getBoard().filter(box => box.ship).forEach(occupiedBox => {
                        const occupiedBoxDiv = document.querySelector(`[data-position='${JSON.stringify(occupiedBox.position)}']`);
                        occupiedBoxDiv.style.backgroundColor = '#00ff00';
                    });

                    shipIndex++;
                }

                if (shipIndex === ships.length) {
                    placingBoardContainer.remove();
                    Game.renderBoards();
                }
            })

            placingBoard.appendChild(boxDiv);
        })
        placingBoardContainer.appendChild(placingBoard);
        placingBoardContainer.appendChild(axisBtn);

        document.body.appendChild(placingBoardContainer)
    }

    const displayResult = (result) => {
        const resultContainer = document.createElement('div');
        resultContainer.id = 'result-container';
        const resultH1 = document.createElement('h1');
        const playAgainBtn = document.createElement('button');

        resultH1.innerText = result;
        playAgainBtn.innerText = 'Play Again';
        playAgainBtn.addEventListener('click', () => {
            resultContainer.remove();
            Game.initialize();
        });

        resultContainer.appendChild(resultH1);
        resultContainer.appendChild(playAgainBtn);

        document.body.appendChild(resultContainer);
    }

    const clearBoards = () => {
        playerBoard.innerHTML = '';
        computerBoard.innerHTML = '';
    }

    const renderPlayerBoard = (player) => {
        player.getPlayerGameboard().getBoard().forEach(box => {
            const boxDiv = document.createElement('div');
            boxDiv.className = 'box';
            box.hasBeenHit ? boxDiv.innerText = 'x' : boxDiv;
            if (player.getIsComputer()) {
                box.hasBeenHit ? boxDiv : boxDiv.addEventListener('click', listenForAttack);
                boxDiv.dataset.position = JSON.stringify(box.position);
                box.hasBeenHit && box.ship ? boxDiv.classList.add('occupied') : boxDiv;
                computerBoard.appendChild(boxDiv); 
            } else {
                if (box.ship) {
                    console.log(box.ship.getHits());
                    console.log(box.ship.isSunk());
                    box.ship.isSunk() ? boxDiv.classList.add('occupied') : boxDiv.classList.add('ship')
                }
                playerBoard.appendChild(boxDiv);
            }
        })
    }

    return { renderPlayerBoard, clearBoards, displayResult, renderShipPlacementScreen }
})()

module.exports = { Game, UI };