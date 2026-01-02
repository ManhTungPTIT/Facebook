const fs = require("fs");
const path = require("path");

const buildPath = path.join(__dirname, "build");
const indexPath = path.join(buildPath, "index.html");
const errorPath = path.join(buildPath, "404.html");

fs.copyFileSync(indexPath, errorPath);
console.log("✔ 404.html created automatically!");
