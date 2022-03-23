const index = require('../index');
const writelog = require('../methods/writelog');
const setPresence = require('../methods/setPresence');

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    const id = member.id;
    let faceit = index.faceapi;
    let steam = index.steam;

    if(channel.id !== "953378480282828861") return;
    
    if (!index.file[id]) {
        writelog(`${member.user.username} hat kein Steam Profil zum Discord Account gebunden!`);
        return channel.send(`Du hast keine Steam Profil zu deinen Account gebunden! Bitte benutze **!steamid**`);
    }

    let faceitid = index.file[id].fic;
    let steamid = index.file[id].sid;

    msg.channel.startTyping();
    setPresence("🦊 Sammle Informationen...", "WATCHING");

    let usersummary = await steam.getUserSummary(steamid).then(p => { return p; } ).catch(err => { writelog(`ERROR: ${err}`); });
    let fcl = await faceit.pl(steamid).then(data => { return data}).catch(err => { writelog(`${err}`); channel.send(`${err}`) });
    let fcp = await faceit.players(faceitid, "stats", "csgo").then(data => { return data }).catch(err => { writelog(`${err}`); channel.send(`${err}`) });

    let mbd = new index.discord.MessageEmbed()
    .setColor(1848932)
    .setThumbnail(usersummary.avatar.large)
    .setTitle(`FaceIT Stats für ${usersummary.nickname}`)
    .setURL(`${usersummary.url}`)
    .addField('Matches Played', fcp.lifetime["Matches"], true)
    .addField('Matches Won', fcp.lifetime["Wins"], true)
    .addField('Win Streak', fcp.lifetime["Current Win Streak"], true)
    .addField('K/D', fcp.lifetime["Average K/D Ratio"], true)
    .addField('Winrate %', fcp.lifetime["Win Rate %"], true)
    .addField('Longest Win Streak', fcp.lifetime["Longest Win Streak"], true)
    .addField('Average Headshot %', fcp.lifetime["Average Headshots %"], true)
    .addField('FaceIT Level', fcl.games.csgo.skill_level, true)
    .addField('ELO', fcl.games.csgo.faceit_elo, true)
    .addField('Last 5 Matches', fcp.lifetime["Recent Results"].toString().replaceAll(",", "").replaceAll("0", "❌").replaceAll("1", "🏆").replaceAll("null", ""), true);

    setPresence(`FuXTrupp 🦊`, `WATCHING`);
    msg.channel.stopTyping();

    channel.send(mbd);

}
