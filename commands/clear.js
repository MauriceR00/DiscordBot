const checkRole = require("../methods/checkRole");
const writelog = require("../methods/writelog");
const setPresence = require('../methods/setPresence');
const { MessageEmbed } = require('discord.js');

module.exports = (msg, args) => {
    const member = msg.member;
    const channel = msg.channel;

    if (checkRole(member, "EIGENTÜMER") || checkRole(member, "ADMIN")) {
        if (args.length < 1) {
            msg.delete({ timeout: 2000 }).catch(err => writelog(err));
            return channel.send(`Bitte eine Anzahl an Nachrichten angeben! Beispiel: **!clear 20**`).then(m => m.delete({ timeout: 10000 }).catch(err => writelog(err)));
        }

        const amt = parseInt(args[0]);
        if (isNaN(amt) === true || !amt || amt < 0 || amt > 100) {
            msg.delete({ timeout: 2000 }).catch(err => writelog(err));
            return channel.send(`Bitte gib eine Zahl zwischen 1 und 100 an! Beispiel: **!clear 20**`).then(m => m.delete({ timeout: 10000 }).catch(err => writelog(err)));
        }

        msg.channel.startTyping();
        setPresence("Lösche Nachrichten...", "WATCHING");

        channel.bulkDelete(amt, true).then(mes => {
            const embed = new MessageEmbed()
                .setTitle('Nachrichten Entfernen...')
                .setDescription(`Konnte erfolgreich **${mes.size}/${amt}** Nachrichten entfernen!`)
                .setFooter(member.user.username, msg.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(327424);

            writelog(`${member.user.username} hat im Channel ${channel.id}(${channel.name}) mithilfe von !clear, ${mes.size}/${amt} Nachrichten gelöscht!`);
            channel.send(embed).then(m => m.delete({ timeout: 10000 }).catch(err => writelog(err)));
        });

        msg.channel.stopTyping();
        setPresence("NABOKI", "WATCHING");
    } else {
        writelog(`${member.user.username} versuchte den Clear Befehl ohne Berechtigung auszuführen!`);
        msg.delete({ timeout: 2000 }).catch(err => writelog(err));
        return channel.send(`Du hast keine Berechtigung diesen Befehl auszuführen!`).then(m => m.delete({ timeout: 5000 }).catch(err => writelog(err)));
    }
}