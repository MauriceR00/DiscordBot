const { ENGINE_METHOD_ALL } = require('constants');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix = "!";

const channelid = "806520416104873994";
const steamkey = "BEDE9C3683E125B0C57AB65B5D8E0427";
const faceitkey = "c80a34ed-820e-4cf8-a596-b3825dd66575";

const file = './data.json';

let data;
try {
    data = JSON.parse(fs.readFileSync('./data.json', 'utf8')); // Load save data
} catch(e) {
    data = { default: 0 }; // Init if no save data found
}

exports.steamkey = steamkey;
exports.faceitkey = faceitkey;
exports.fs = fs;
exports.data = data;
exports.file = file;
exports.discord = Discord;

fs.readdir("./events/", (err, files) => {
    files.forEach((file) => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    })
})

client.login("ODA3NjYxMDc0NzEwNzkwMTQ2.YB7O_Q.r2uNp8YSe-3wMuqUiHegMF6DBrE");
