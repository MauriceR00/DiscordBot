const writelog = require('../methods/writelog');

module.exports = (error) => {
    return writelog(`${error}`);
}