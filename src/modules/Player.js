function Player(playerGameboard, isComputer) {
    if (isComputer) {
        const randomAttack = (enemyBoard) => {
            let availablePositions = enemyBoard.getAvailableBoxes().map(availableBox => availableBox.position);
            let randomIndex = Math.floor(Math.random() * availablePositions.length);
            enemyBoard.recieveAttack(availablePositions[randomIndex]);
        }
        return { randomAttack }
    } else {
        const attack = (enemyBoard, position) => enemyBoard.recieveAttack(position);

        return { attack }
    }
}

module.exports = Player;