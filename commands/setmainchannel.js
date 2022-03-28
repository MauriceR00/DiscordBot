const index = require('../index');

module.exports = (msg, args) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = member.id;
    const guild_id = msg.guild.id;
    const ids = [ "335926647834542081", [index.file[guild_id].botadmin] ];
    
    if(ids.indexOf(member.id)) return;


    index.file[guild_id].mainchannel = channel.id;
    index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));
    channel.send("Mainchannel wurde auf diesen Channel gesetzt!")
    return;
} 
