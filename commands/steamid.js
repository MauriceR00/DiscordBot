const fetch = require('node-fetch');
const index = require('../index');
const writelog = require('../methods/writelog');

module.exports = async (msg, id) => {
    const member = msg.member;
    const channel = msg.channel;

    if(channel.id !== index.channelid) return;

    if(id.length < 1) {
        msg.delete();
        return channel.send(`Bitte gib eine SteamID64 an! Beispiel: "!steamid 76561198880500806"`);
    }
    if(index.file[member.id]) {
        msg.delete();
        writelog(`${member.user.username} versuchte bereits gebundenen Account zu binden!`);
        return channel.send(`Die SteamID ist bereits zum Discord account gebunden! (${index.file[member.id].sid} und ${index.file[member.id].fic})`);
    }
    //let file = require("./data.json");
    if(id === undefined) return channel.send(`Bitte eine SteamID angeben! Beispiel: !steamid 76561198880500806`);

    const result = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${index.steamkey}&steamids=${id}`).then(sres => sres.json());
    if(result === undefined) {
        writelog(`Konnte keine SteamID unter ${id} finden! (${member.user.username})`);
        return channel.send(`Keine SteamID unter ${id} gefunden!`);
    }
    let ids = JSON.stringify(result.response.players[0].steamid).replaceAll('"', '');
    console.log(ids);
    const faceit = await fetch(`https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${ids}`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + index.faceitkey }} ).then(fcres => fcres.json());
    if(faceit === undefined) {
        writelog(`Kein FaceIT Account unter ${ids} gefunden! (${member.user.username})`);
        return channel.send(`Kein FaceIT Account unter ${ids} gefunden!`);
    }
    let fcid = JSON.stringify(faceit.player_id).replaceAll('"', '');
    index.file[member.id] = { sid: ids, fic: fcid };
    console.log(fcid);
    index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));
    writelog(`SteamID (${ids}) & FaceIT ID (${fcid}) zu Discord ACC von ${member.user.username} gebunden!`);
    return channel.send(`SteamID (${ids}) und FaceIT ID (${fcid}) zum Discord Account von ${member.user.username} gebunden!`);
}