require("dotenv").config()
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const csgostatus = require('./methods/csgostatus');
const writelog = require('./methods/writelog');
const userAmount = require('./methods/userAmount');


const prefix = "!";
const channelid = "806520416104873994";
const botkey = process.env.BOT_TOKEN;
const steamkey = process.env.STEAM;
const faceitkey = process.env.FACEIT;

var fetchrequest = false;

const path = './data.json';
var read = fs.readFileSync(path);
var file = JSON.parse(read);
let sec, days, hours, min, seconds;

setInterval(() => {
    csgostatus();
}, 10000);
setInterval(() => {
    userAmount();
}, 30000);


exports.steamkey = steamkey;
exports.faceitkey = faceitkey;
exports.fs = fs;
exports.file = file;
exports.discord = Discord;
exports.path = path;
exports.client = client;
exports.channelid = channelid;
exports.botkey = botkey;
exports.fetchrequest = fetchrequest;

fs.readdir("./events/", (err, files) => {
    files.forEach((file) => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    })
})

client.login(botkey); 
