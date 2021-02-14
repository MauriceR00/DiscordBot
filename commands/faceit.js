const fetch = require('node-fetch');
const index = require('../index');
const csgo = require('./csgo');

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = member.id;

    let fic, sid, m, w, cws, kd, wr, lws, ah, sl, elo;

    if (!index.file[id]) {
        msg.delete();
        return channel.reply(`Du hast keine SteamID zu deinen Account gebunden! Bitte benutze "!steamid"`);
    }
    fic = index.file[id].fic;
    sid = index.file[id].sid;

    var header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + index.faceitkey
    }

    const f1 = await fetch(`https://open.faceit.com/data/v4/players/${fic}/stats/csgo`, { method: 'GET', headers: header }).then(res => res.json());
    if (f1 === undefined) return channel.send(`Konnte keine Daten für ${member.user.username} finden! Eventuell ist die FaceIT API Down`);
    m = f1.lifetime["Matches"], w = f1.lifetime["Wins"], cws = f1.lifetime["Current Win Streak"], kd = f1.lifetime["Average K/D Ratio"], wr = f1.lifetime["Win Rate %"], lws = f1.lifetime["Longest Win Streak"], ah = f1.lifetime["Average Headshots %"];


    const f2 = await fetch(`https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${sid}`, { method: 'GET', headers: header }).then(res => res.json());
    if (f2 === undefined) return channel.send(`Konnte keine Daten für ${member.user.username} finden! Eventuell ist die FaceIT API Down`);
    sl = f2.games.csgo["skill_level"], elo = f2.games.csgo["faceit_elo"];

    let mbd = new index.discord.MessageEmbed()
        .setColor(1848932)
        .setTitle(`FaceIT Stats für ${member.user.username}`)
        .addField('Matches Played', m, true)
        .addField('Matches Won', w, true)
        .addField('Winstreak', cws, true)
        .addField('K/D', kd, true)
        .addField('Winrate %', wr, true)
        .addField('Longest Winstreak', lws, true)
        .addField('Average Headshot %', ah, true)
        .addField('FaceIT Level', sl, true)
        .addField('ELO', elo, true);

    return channel.send(mbd);
}