const index = require('../index');
const writelog = require('../methods/writelog');

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const guild_id = msg.guild.id;
    const uid = member.id; 

    if(channel.id !== (index.file[guild_id].mainchannel)) return;

    if(index.file[uid]) {
        delete index.file[uid];
        index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));
        writelog(`Der verbundene Steam Account von ${member.user.username} wurde entfernt!`);
        channel.send(`Der verbundene Steam Account von ${member.user.username} wurde entfernt!`);
        return;
    } else {
        channel.send(`Dein Discord Account hat keinen verbundenen Steam Account!`);
    }
}
