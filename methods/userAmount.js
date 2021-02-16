const index = require("../index");

module.exports = () => {
    //Channel 1: Mitglieder
    //Channel 2: Online
    //Channel 3: Admin/Eigentümer Online
    //Channel 4: NABOKI Online
    const ch1 = "811200428695355412";
    const ch1n = "ᴍɪᴛɢʟɪᴇᴅᴇʀ: ";
    const ch2 = "811200441265160212";
    const ch2n = "ᴏɴʟɪɴᴇ: ";
    const ch3 = "811200452904747038";
    const ch3n = "ᴀᴅᴍɪɴ's: ";
    const ch4 = "811200470591995924";
    const ch4n = "ɴᴀʙᴏᴋɪ: ";
    const guildid = "692540945022844948";

    const bot = index.client;
    const guild = bot.guilds.cache.get(guildid);

    const c1 = bot.channels.cache.get(ch1);
    const c2 = bot.channels.cache.get(ch2);
    //const c3 = bot.channels.cache.get(ch3);
    //const c4 = bot.channels.cache.get(ch4);

    c1.setName(`${ch2n}${guild.members.cache.filter(m => m.presence.status !== "offline").size} ᴠᴏɴ ${guild.memberCount.toLocaleString()}`);
    //c2.setName(`${ch2n}${guild.members.cache.filter(m => m.presence.status !== "offline").size}`);
    c2.setName(`${ch3n}${guild.members.cache.filter(m => m.roles.cache.has("708412403737559111") && m.presence.status !== "offline" || m.roles.cache.has("708411222663364630") && m.presence.status !== "offline").size}`);
    //c4.setName(`${ch4n}${guild.members.cache.filter(m => m.roles.cache.has("726909303075635261") && m.presence.status !== "offline").size}`);

}