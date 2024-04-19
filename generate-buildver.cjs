var fs = require("fs");
var FILE_NAME = "./public/ks.version.json";

console.log("Incrementing build number...");
fs.readFile(FILE_NAME, function (err, content) {
  if (err) throw err;
  var metadata = JSON.parse(content);
  metadata.KSbuildRevision = metadata.KSbuildRevision + 1;
  fs.writeFile(FILE_NAME, JSON.stringify(metadata), function (err) {
    if (err) throw err;
    console.log(`Current build number: ${metadata.KSbuildRevision}`);
  });
});
