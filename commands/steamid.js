const fetch = require('node-fetch');
const index = require('../index');

module.exports = async (msg, id) => {
    const member = msg.member;
    const channel = msg.channel;
    if(id === undefined) return channel.send(`Bitte eine SteamID angeben! Beispiel: !steamid 76561198880500806`);

    const result = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${index.steamkey}&steamids=${id}`).then(response => response.json());
    if(result === undefined) return channel.send(`Keine SteamID unter ${id} gefunden!`);
    let ids = result.response.players[0].steamid;
    console.log(ids);
    index.fs.writeFile(index.file, `${member.id}: ${ids}`, function(err, result) { 
        if(err) {
             console.log(`ERROR: ${err}`);
             return channel.send(`Fehler beim Speichern der SteamID!`);
            }
        });

    const faceit = await fetch(`https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${ids}`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + index.faceitkey }} ).then(fcres => fcres.json());
    if(faceit === undefined) return channel.send(`Kein FaceIT Account unter ${ids} gefunden!`)
    let fcid = faceit.player_id;
    console.log(fcid);
    index.fs.writeFile(index.file, `${member.id}.faceit: ${fcid}`, function(err,result) { 
        if(err) { 
            console.log(`ERROR: ${err}`); 
            return channel.send(`Fehler beim Speichern der FaceIT ID!`); 
        } 
    });
    return channel.send(`SteamID (${ids}) und FaceIT ID (${fcid}) zum Discord Account von ${msg.member.nickname} gebunden!`);
}