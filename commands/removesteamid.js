const index = require('../index');
const writelog = require('../methods/writelog');
const setPresence = require('../methods/setPresence');

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const uid = member.id; 

    if(index.file[uid]) {
        delete index.file[uid];
        index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));
        channel.send(`Der verbundene Steam Account von ${member.user.username} wurde entfernt!`);
        return;
    } else {
        channel.send(`Dein Discord Account hat keinen verbundenen Steam Account!`);
    }
}
