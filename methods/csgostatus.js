const { default: fetch } = require('node-fetch');
const index = require('../index');

module.exports = async () => {
    let channel = index.client.channels.cache.find(ch => ch.id === "806520416104873994");
    if(!channel) return console.log(`ERROR WHILE GETTING CSGO-STATS CHANNEL`);

    const s = await fetch(`https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${index.steamkey}`).then(res => res.json());
    if(s === undefined) return;
    let status = JSON.stringify(s.result.services.SessionsLogon).replaceAll('"', '');
    if(index.file["status"].status === status) return;
    index.file["status"] = { status };

    let cl;
    if(status === "normal") cl = 327424;
    if(status === "critical") cl = 16711680;
    if(status === "surge") cl = 16711680;
    if(status === "delayed") cl = 14978560;

    let mbd = new index.discord.MessageEmbed()
    .setColor(cl)
    .setTitle(`CSGO Session Logon`)
    .setDescription(`Der "CSGO Session Logon" status ist zu ${status} gewechselt!`);


    index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));

    return channel.send(mbd);
}