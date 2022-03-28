const index = require('../index');

module.exports = (msg, args) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = member.id;
    const guild_id = msg.guild.id;

    if(member.id !== "335926647834542081") return;
    if(args.length < 1) return;


    index.file[guild_id].botadmin = args[0];
    index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));
    channel.send("Bot Admin wurde gesetzt!")
    return;
} 
