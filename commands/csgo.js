const fetch = require('node-fetch');
const index = require('../index');
const rtt = require('../methods/roundToTwo');
const writelog = require('../methods/writelog');
const setPresence = require('../methods/setPresence');

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = member.id;

    let sid, kills, deths, plantedbombs, defusedbombs, hostages, knifekills, headshots, shotsfired, shotshit, mvps, kd, headshotp;

    if(channel.id !== index.channelid) return;

    if(!index.file[id]) {
        msg.delete();
        return channel.send(`Du hast keine SteamID zu deinen Account gebunden! Bitte benutze "!steamid"`);
    }
    sid = index.file[id].sid;

    msg.channel.startTyping();
    setPresence("Sammle Informationen...", "WATCHING");

    const cs = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${index.steamkey}&steamid=${sid}&appid=730`);
    const text = await cs.text();
    let a;
    try {
        a = JSON.parse(text);
    } catch (err) {
        writelog(`Konnte keine Daten für ${member.user.username} finden! Profil Privat? Steam Down?`);
        return channel.send(`Konnte keine Daten für ${member.user.username} finden! Eventuell ist das Profil Privat, oder Steam ist Down! (${err})`);
    }
    if (!a.playerstats) {
        writelog(`Konnte keine Daten für ${member.user.username} finden! Profil Privat? Steam Down?`);
        return channel.send(`Konnte keine Daten für ${member.user.username} finden! Eventuell ist das Profil Privat, oder Steam ist Down!`);
    }
    a.playerstats.stats.forEach(element => {
        if (element.name === "total_kills") kills = element.value;
        if (element.name === "total_deaths") deaths = element.value;
        if (element.name === "total_planted_bombs") plantedbombs = element.value;
        if (element.name === "total_defused_bombs") defusedbombs = element.value;
        if (element.name === "total_rescued_hostages") hostages = element.value;
        if (element.name === "total_kills_knife") knifekills = element.value;
        if (element.name === "total_kills_headshot") headshots = element.value;
        if (element.name === "total_shots_fired") shotsfired = element.value;
        if (element.name === "total_shots_hit") shotshit = element.value;
        if (element.name === "total_mvps") mvps = element.value;
    });
    kd = rtt(kills / deaths);
    headshotp = rtt((headshots * 100) / kills);

    let mbd = new index.discord.MessageEmbed()
        .setColor(1848932)
        .setTitle(`CSGO Stats für ${member.user.username}`)
        .addField('Kills', kills, true)
        .addField('Deaths', deaths, true)
        .addField('K/D', kd, true)
        .addField('Planted Bombs', plantedbombs, true)
        .addField('Defused Bombs', defusedbombs, true)
        .addField('Hostages Rescued', hostages, true)
        .addField('Knife Kills', knifekills, true)
        .addField('Headshots', headshots, true)
        .addField('Headshot %', headshotp, true)
        .addField('Shots Fired', shotsfired, true)
        .addField('Shots Hit', shotshit, true)
        .addField('MVPs', mvps, true);

    msg.channel.stopTyping();
    setPresence("NABOKI", "WATCHING");

    return channel.send(mbd);
}