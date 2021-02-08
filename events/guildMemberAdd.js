module.exports = (client, member) => {
    let w_channel = member.guild.channels.cache.find(ch => ch.id === "692540945022844951");
    if (!w_channel) return;
    let w_embed = new Discord.MessageEmbed()
        .setColor(327424)
        .setTitle(`Willkommen @${member.nickname} auf dem NABOKI Discord Server!`)
        .setDescription("Wir hoffen du hast einen angenehmen Aufenthalt.\nWir sind fast jeden Abend präsent und freuen uns auf dich!");
    w_channel.send(w_embed);
}