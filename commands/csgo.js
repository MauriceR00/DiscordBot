const index = require('../index');
const rtt = require('../methods/roundToTwo');
const writelog = require('../methods/writelog');
const setPresence = require('../methods/setPresence');

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = member.id;
    let steam = index.steam;


    //if(channel.id !== "953378480282828861") return;

    if(!index.file[id]) {
        writelog(`${member.user.username} hat kein Steam Profil zum Discord Account gebunden!`);
        return channel.send(`Du hast keine Steam Profil zu deinen Account gebunden! Bitte benutze **!steamid**`);
    }

    let steamid = index.file[id].sid;

    msg.channel.startTyping();
    setPresence("🦊 Sammle Informationen...", "WATCHING");

    let usersummary = await steam.getUserSummary(steamid).then(p => { return p; } ).catch(err => { writelog(`ERROR: ${err}`); });
    let userstats = await steam.getUserStats(steamid, "730").then(p => { return p; } ).catch(err => { writelog(`ERROR: ${err}`); });

    kd = rtt(userstats.stats.total_kills / userstats.stats.total_deaths);
    headshotp = rtt((userstats.stats.total_kills_headshot * 100) / userstats.stats.total_kills);

    let asd;
    await index.csgoi.requestPlayersProfile(steamid, function(data) {
        asd = data.account_id;
        //data.ranking.wins
        //data.ranking.rank_id
        return console.log(asd);
    });
    //console.log(a);


    let mbd = new index.discord.MessageEmbed()
        .setColor(1848932)
        .setThumbnail(usersummary.avatar.large)
        .setTitle(`CSGO Stats für ${usersummary.nickname}`)
        .setURL(`${usersummary.url}`)
        .addField('Kills', userstats.stats.total_kills, true)
        .addField('Deaths', userstats.stats.total_deaths, true)
        .addField('K/D', kd, true)
        .addField('Planted Bombs', userstats.stats.total_planted_bombs, true)
        .addField('Defused Bombs', userstats.stats.total_defused_bombs, true)
        .addField('HE Grenade Kills', userstats.stats.total_kills_hegrenade, true)
        .addField('Knife Kills', userstats.stats.total_kills_knife, true)
        .addField('Headshots Kills', userstats.stats.total_kills_headshot, true)
        .addField('Headshot %', headshotp, true)
        .addField('Shots Fired', userstats.stats.total_shots_fired, true)
        .addField('Shots Hit', userstats.stats.total_shots_hit, true)
        .addField('MVPs', userstats.stats.total_mvps, true);


    setPresence(`FuXTrupp 🦊`, `WATCHING`);
    msg.channel.stopTyping();
    channel.send(mbd);
}
