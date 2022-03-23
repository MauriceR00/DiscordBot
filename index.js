require("dotenv").config()
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const SteamAPI = require('steamapi');
const Faceit = require('faceit-js');

const SteamUser = require('steam-user');
const GlobalOffensive = require('globaloffensive');
var clnt = new SteamUser();
let csgo = new GlobalOffensive(clnt);


const botkey = process.env.BOT_TOKEN;
const steamkey = process.env.STEAM;
const faceitkey = process.env.FACEIT;
const path = './data.json';
const steam = new SteamAPI(steamkey);
const faceapi = new Faceit(faceitkey);

var read = fs.readFileSync(path);
var file = JSON.parse(read);
var fetchrequest = false;

exports.steamkey = steamkey;
exports.faceitkey = faceitkey;
exports.fs = fs;
exports.file = file;
exports.discord = Discord;
exports.path = path;
exports.client = client;
exports.botkey = botkey;
exports.fetchrequest = fetchrequest;
exports.steam = steam;
exports.faceapi = faceapi;
exports.csgoi = csgo;

faceapi.account().then(data => console.log(data));

fs.readdir("./events/", (err, files) => {
    files.forEach((file) => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    })
})


clnt.logOn({
	"accountName": "NOPE",
	"password": "NOPE"
});

clnt.on('loggedOn', function() {
	console.log("Logged into Steam");
	clnt.setPersona(SteamUser.EPersonaState.Invisible);
	clnt.gamesPlayed([730]);
});


clnt.on('error', function(a) {
	console.log(a);
});

csgo.on('debug', console.log);

client.on('friendRelationship', function(steamID, relationship) {
    //if (relationship == SteamUser.Steam.EFriendRelationship.RequestRecipient) {
        client.addFriend(steamID);
        console.log(`Added ${steamID}`);
    //}
});


client.on('friendsList', function () {
    for (var i = 0; i < Object.keys(client.myFriends).length; i++) {
        if (client.myFriends[Object.keys(client.myFriends)[i]] == SteamUser.EFriendRelationship.RequestRecipient) {
            console.log('Added ' + Object.keys(client.myFriends)[i]);
            client.addFriend(Object.keys(client.myFriends)[i]);
        }
    }
});

client.login(botkey);

csgo.on("connectedToGC", function() {
    console.log("Connected to GC");
})
