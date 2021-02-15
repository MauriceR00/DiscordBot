const index = require('../index');

module.exports = (n, t) => {
    let c = index.client;
    c.user.setPresence({ activity: { name: n, type: t}, status: 'online'});
}