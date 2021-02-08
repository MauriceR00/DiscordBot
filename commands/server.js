const checkRole = require("../methods/checkRole");
const Discord = require('discord.js');

module.exports = (msg) => {
    let member = msg.member;
    let channel = msg.channel;
    if (checkRole(member, "ADMIN") || checkRole(member, "EIGENTÜMER") || checkRole(member, "NABOKI")) {
        msg.delete( { timeout: 200 });
        let e = new Discord.MessageEmbed()
            .setColor(327424)
            .setTitle(`**NABOKI CS:GO Server**`)
            .setDescription("Connect to our CS:GO Server via the IP **naboki.team**");
        channel.send(e);
        return;
    }
}