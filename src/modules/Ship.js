function Ship(length) {
    let hits = 0;

    const getLength = () => length;
    const getHits = () => hits
    const hit = () => hits++;
    const isSunk = () => hits === length ? true : false;

    return { getLength, hit, isSunk, getHits }
}

module.exports = Ship;