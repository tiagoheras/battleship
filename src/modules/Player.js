function Player(playerGameboard, isComputer) {
    const getPlayerGameboard = () => playerGameboard;
    const getIsComputer = () => isComputer;
    if (isComputer) {
        const randomAttack = (enemyBoard) => {
            let availablePositions = enemyBoard.getAvailableBoxes().map(availableBox => availableBox.position);
            let randomIndex = Math.floor(Math.random() * availablePositions.length);
            enemyBoard.recieveAttack(availablePositions[randomIndex]);
        }
        return { randomAttack, getPlayerGameboard, getIsComputer }
    } else {
        const attack = (enemyBoard, position) => enemyBoard.recieveAttack(position);

        return { attack, getPlayerGameboard, getIsComputer }
    }
}

module.exports = Player;