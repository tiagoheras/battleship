function Ship(length) {
    const hits = [];

    const getLength = () => length;
    const getHits = () => hits
    const hit = (position) => position > 0 && position <= length ? hits.push(position) : position;
    const isSunk = () => hits.length === length ? true : false;

    return { getLength, hit, isSunk, getHits }
}

module.exports = Ship;