function Ship(length) {
    const hits = [];

    const hit = (position) => position > 0 && position <= length ? hits.push(position) : position;
    const isSunk = () => hits.length === length ? true : false;

    return { hit, isSunk, hits }
}

module.exports = Ship;