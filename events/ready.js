const writelog = require('../methods/writelog');

module.exports = (client) => {
    writelog(`Logged in as ${client.user.tag}`);
    console.log(`Logged in as ${client.user.tag}`);
}