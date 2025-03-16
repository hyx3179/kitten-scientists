const fs = require("node:fs");
const FILE_NAME = "./public/ks.version.json";

console.log("Incrementing build number...");
fs.readFile(FILE_NAME, (err, content) => {
  if (err) throw err;
  const metadata = JSON.parse(content);
  metadata.KSbuildRevision = metadata.KSbuildRevision + 1;
  fs.writeFile(FILE_NAME, JSON.stringify(metadata), err => {
    if (err) throw err;
    console.log(`Current build number: ${metadata.KSbuildRevision}`);
  });
});
