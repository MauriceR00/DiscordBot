const writelog = require('../methods/writelog');
const index = require('../index');

module.exports = (client) => {
    index.client.user.setPresence({ activity: { name: `NABOKI`, type: 'WATCHING' }, status: 'online'});
    return writelog(`Logged in as ${client.user.tag}`);
}