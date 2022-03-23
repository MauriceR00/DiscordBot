const index = require('../index');
const writelog = require('../methods/writelog');
const setPresence = require('../methods/setPresence');

module.exports = async (msg, id) => {
    let steam = index.steam;
    let faceit = index.faceapi;
    const member = msg.member;
    const channel = msg.channel;
    const uid = member.id; 
    
    if(channel.id !== "953378480282828861") return;

    if(id.length < 1) {
        return channel.send(`Bitte gib eine gültige SteamID oder Steam Profil URL an!`);
    }
    if(index.file[uid]) {
        writelog(`${member.user.username} versuchte einen bereits verbundenen Account erneut zu verbinden!`);
        return channel.send(`Du hast bereits einen Steam Account zu deinen Discord Account verbunden!`);
    }
    if(hasValueDeep(index.file, id[0])) {
        writelog(`${member.user.username} versuchte einen bereits verbundenen Account erneut zu verbinden!`);
        return channel.send(`Du hast bereits einen Steam Account zu deinen Discord Account verbunden!`);
    }

    setPresence(`🦊 Suche SteamID...`);
    msg.channel.startTyping();

    let steamid = await steam.resolve(id[0]).then(p => { return p; } ).catch(err => { writelog(`ERROR: ${err}`); channel.send(`ERROR: ${err}`) });
    let username = await steam.getUserSummary(steamid).then(p => { return p.nickname; } ).catch(err => { writelog(`ERROR: ${err}`); channel.send(`ERROR: ${err}`) });
    let faceitid = await faceit.pl(steamid).then(data => { return JSON.stringify(data.player_id).replaceAll('"', '')}).catch(err => { writelog(`${err}`); channel.send(`${err}`) });

    if (steamid !== undefined) {
        index.file[uid] = { sid: steamid, fic: faceitid };
        index.fs.writeFileSync(index.path, JSON.stringify(index.file, null, 2));
        setPresence(`FuXTrupp 🦊`, `WATCHING`);
        msg.channel.stopTyping();
        return channel.send(`Steam Account ${username} mit SteamID ${steamid} mit den Discord Account ${member.user.username} verbunden!`);
    }

}

function hasValueDeep(json, findValue) {
    const values = Object.values(json);
    let hasValue = values.includes(findValue);
    values.forEach(function(value) {
        if (typeof value === "object") {
            hasValue = hasValue || hasValueDeep(value, findValue);
        }
    })
    return hasValue;
}
