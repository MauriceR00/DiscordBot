const writelog = require('../methods/writelog');
const index = require('../index');
const prefix = '!';

module.exports = (client, msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    writelog(`"${msg.author.username}" -> ${command} (${args})`);

    index.fs.readdir("./commands/", (err, files) => {
        files.forEach((file) => {
            const eventName = file.split(".")[0];
            if(command === eventName) {
                const commandHandler = require(`../commands/${file}`);
                return commandHandler(msg, args);
            }
        })
    })
}
