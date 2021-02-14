const checkRole = require("../methods/checkRole");
const index = require("../index");

module.exports = async (msg) => {
    const member = msg.member;
    const channel = msg.channel;
    if (checkRole(member, "ADMIN") || checkRole(member, "EIGENTÜMER")) {
        msg.delete();
        await console.log(`Logged out from Bot Account. Command used by ${member.user.username}`);
        await channel.send("Logging out from Bot Account");
        index.client.destroy();
        return;
    }
}