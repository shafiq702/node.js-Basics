var profile = require("./weather");
var zip = process.argv.slice(2);
zip.forEach(profile.get);
