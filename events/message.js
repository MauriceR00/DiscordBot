const writelog = require('../methods/writelog');
const csgo = require('../commands/csgo');
const steamid = require('../commands/steamid');
const removesteamid = require('../commands/removesteamid');
const setsteamid = require('../commands/setsteamid');
const faceit = require('../commands/faceit');
const prefix = '!';

module.exports = (client, msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    writelog(`"${msg.author.username}" -> ${command} (${args})`);

    if(command === "csgo") return csgo(msg);
    if(command === "steamid") return steamid(msg, args);
    if(command === "removesteamid") return removesteamid(msg);
    if(command === "setsteamid") return setsteamid(msg, args);
    if(command === "faceit") return faceit(msg);
}
