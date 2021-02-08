const logout = require("../commands/logout");
const server = require("../commands/server");
const ping = require("../commands/ping");
const steamid = require("../commands/steamid");
const csgo = require("../commands/csgo");
const axios = require('axios');
const prefix = "!";

module.exports = (client, msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if(command === "logout") return logout(msg);
    if(command === "server") return server(msg);
    if(command === "ping") return ping(msg);
    if(command === "steamid") return steamid(msg, args);
    if(command === "csgo") return csgo(msg);
}