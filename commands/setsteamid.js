const fetch = require('node-fetch');
const index = require('../index');
const writelog = require('../methods/writelog');

module.exports = async (msg, id) => {
    const member = msg.member;
    const channel = msg.channel;

    //USAGE: !setsteamid DISCORD_USER STEAMID

    if(channel.id !== index.channelid) return;
    if(member.id !== "335926647834542081") return;

    if(id.length < 2) {
        msg.delete();
        return;
    }
    let usrid = id[0];
    let sid = id[1];

    if(index.file[usrid]) {
        msg.delete();
        writelog(`${member.user.username} versuchte bereits gebundenen Account zu binden!`);
        return channel.send(`Die SteamID ist bereits zum Discord account gebunden! (${index.file[usrid].sid} und ${index.file[usrid].fic})`);
    }
    if(id === undefined) return;

    const result = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${index.steamkey}&steamids=${sid}`).then(sres => sres.json());
    if(result === undefined) {
        writelog(`Konnte keine SteamID unter ${sid} finden! (${member.user.username})`);
        return channel.send(`Keine SteamID unter ${sid} gefunden!`);
    }
    let ids = JSON.stringify(result.response.players[0].steamid).replaceAll('"', '');
    console.log(ids);
    const faceit = await fetch(`https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${ids}`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + index.faceitkey }} ).then(fcres => fcres.json());
    if(faceit === undefined) {
        writelog(`Kein FaceIT Account unter ${ids} gefunden! (${member.user.username})`);
        return channel.send(`Kein FaceIT Account unter ${ids} gefunden!`);
    }
    let fcid = JSON.stringify(faceit.player_id).replaceAll('"', '');
    index.file[usrid] = { sid: ids, fic: fcid };
    console.log(fcid);
    index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));
    let usr = index.client.users.cache.find(u => u.id === usrid);
    writelog(`SteamID (${ids}) & FaceIT ID (${fcid}) zu Discord ACC von ${usr.username} gebunden!`);
    return channel.send(`SteamID (${ids}) und FaceIT ID (${fcid}) zum Discord Account von ${usr.username} gebunden!`);
}