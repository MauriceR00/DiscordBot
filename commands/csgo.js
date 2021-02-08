const { DiscordAPIError } = require('discord.js');
const fetch = require('node-fetch');
const index = require('../index');
const rtt = require('../methods/roundToTwo');

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = msg.member.id;

    let sid, kills, deths, plantedbombs, defusedbombs, hostages, knifekills, headshots, shotsfired, shotshit, mvps, kd, headshotp;

    
    //try {
       // sid = index.fs.readFile(index.file, function(err, result) {
           // if(err) {
           //     console.log(`ERROR: ${err}`);
           //     return channel.send(`FEHLER: Es gab Probleme beim Lesen der Speicherungsdatei!`);
          //  }
       //git  });
        //sid.forEach(element => {
            //if(element.includes(id)) {
                //engine.log(element);
           //}
       // });
    //} catch (err) {
      //  console.log(err);
      //  return channel.send(`FEHLER: Es gab Probleme beim Lesen der Speicherungsdatei!`);
    //}

    const cs = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${index.steamkey}&steamid=${sid}&appid=730`).then(res => res.json());
    if (cs === undefined) return channel.send(`Konnte keine Daten für ${member.nickname} finden! Eventuell ist das Profil Privat, oder Steam ist Down!`);
    cs.playerstats.stats.forEach(element => {
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
        .setTitle(`CSGO Stats für ${member.nickname}`)
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

    return channel.send(mbd);
}