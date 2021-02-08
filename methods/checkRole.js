module.exports = (member, string) => {
    if (member.roles.cache.find(r => r.name === string)) return true;
    else return false;
}