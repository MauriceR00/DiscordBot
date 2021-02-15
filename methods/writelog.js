const index = require('../index');

module.exports = (text) => {
    const log = './log.txt';
    var readlog = index.fs.readFileSync(log);
    var dt = new Date().toLocaleString();
    var writelog = index.fs.writeFileSync(log, `${dt}:: ${text}\n${readlog}`);
    console.log(text);
}