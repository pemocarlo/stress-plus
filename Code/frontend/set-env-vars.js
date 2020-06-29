const writeFile = require("fs").writeFileSync;

const fileName = ".env.production.local";

const buildTime = new Date().getTime();

writeFile(fileName, `REACT_APP_BUILD_TIME=${buildTime}`, {encoding: "utf-8"});
