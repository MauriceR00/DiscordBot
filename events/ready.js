const writelog = require('../methods/writelog');
const index = require('../index');
const setPresence = require('../methods/setPresence');

module.exports = (client) => {
    setPresence(`FuXTrupp 🦊`, `WATCHING`);
    return writelog(`Logged in as ${client.user.tag}`);
}
