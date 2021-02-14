const { ENGINE_METHOD_ALL } = require('constants');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const csgostatus = require('./methods/csgostatus');
const prefix = "!";

const channelid = "806520416104873994";
const steamkey = "BEDE9C3683E125B0C57AB65B5D8E0427";
const faceitkey = "c80a34ed-820e-4cf8-a596-b3825dd66575";
const botkey = "ODA3NjYxMDc0NzEwNzkwMTQ2.YB7O_Q.LnO6cY4D-2CQGgYyHlT-sAa0bd8";

const path = './data.json';
var read = fs.readFileSync(path);
var file = JSON.parse(read);

setInterval(() => {
    csgostatus();
}, 10000)


exports.steamkey = steamkey;
exports.faceitkey = faceitkey;
exports.fs = fs;
exports.file = file;
exports.discord = Discord;
exports.path = path;
exports.client = client;
exports.channelid = channelid;
exports.botkey = botkey;

fs.readdir("./events/", (err, files) => {
    files.forEach((file) => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    })
})

client.login(botkey);
