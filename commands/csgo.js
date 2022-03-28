const index = require('../index');
const rtt = require('../methods/roundToTwo');
const writelog = require('../methods/writelog');
const ranks = [ "Unranked", "Silver 1", "Silver 2", "Silver 3", "Silver 4", "Silver Elite", "Silver Elite Master", "Gold Nova 1", "Gold Nova 2", "Gold Nova 3", "Gold Nova Master", "Master Guardian 1", "Master Guardian 2", "Master Guardian Elite", "Distinguished Master Guardian", "Legendary Eagle", "Legendary Eagle Master", "Supreme Master First Class", "The Global Elite"];
const rankemotes = [ ":unranked:", ":s1:", ":s2:", ":s3:", ":s4:", ":se:", ":sem:", ":gn1:", ":gn2:", ":gn3:", ":gnm:", ":mg1:", "<:mg2:956626888321810482>", ":mge:", ":dmg:", ":le:", ":lem:", ":supreme:", ":globalelite:"];

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = member.id;
    const guild_id = msg.guild.id;
    let steam = index.steam;


    if(channel.id !== index.file[guild_id].mainchannel) return;

    if(!index.file[id]) {
        writelog(`${member.user.username} hat kein Steam Profil zum Discord Account gebunden!`);
        return channel.send(`Du hast keine Steam Profil zu deinen Account gebunden! Bitte benutze **!steamid**`);
    }

    let steamid = index.file[id].sid;

    msg.channel.startTyping();

    let usersummary = await steam.getUserSummary(steamid).then(p => { return p; } ).catch(err => { writelog(`ERROR: ${err}`); });
    let userstats = await steam.getUserStats(steamid, "730").then(p => { return p; } ).catch(err => { writelog(`ERROR: ${err}`); });

    kd = rtt(userstats.stats.total_kills / userstats.stats.total_deaths);
    headshotp = rtt((userstats.stats.total_kills_headshot * 100) / userstats.stats.total_kills);

	const x = await new Promise(function(resolve, reject) {
        index.csgoi.requestPlayersProfile(steamid, function(data) {
            resolve(data)
        });
    });

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

    try {
        if(x !== undefined) {
            if(x.ranking.wins !== undefined) mbd.addField("Matchmaking Wins", x.ranking.wins, true);
            if(x.ranking.rank_id !== undefined) mbd.addField("Matchmaking Rank", ranks[x.ranking.rank_id], true);
        }
    } catch(err) {
        writelog(`ERROR: ${err}`);
    }
    msg.channel.stopTyping();
    channel.send(mbd);
}
