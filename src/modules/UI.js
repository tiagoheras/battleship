const UI = (function () {
    const initialize = () => {
        const title = document.createElement('h1');
        title.innerText = 'Battleship';
        document.body.appendChild(title);
    }

    const listenToAttack = () => {
        return 'player must pick attacking position';
        // boardElement.addEventListener('mouseup', (e) => {
        //     let position = e.target.position;
            
        // })
    }
    return { initialize , listenToAttack}
})()

module.exports = UI;