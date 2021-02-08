const checkRole = require("../methods/checkRole");
const index = require("../index.js");

module.exports = (msg) => {
    let member = msg.member;
    if(checkRole(member, "ADMIN") || checkRole(member, "EIGENTÜMER")) {
        msg.delete({timeout: 200});
        msg.channel.send(`Ping is: ${Date.now() - msg.createdTimestamp}ms.`);
        return;
    }
}