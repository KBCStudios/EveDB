//console.log(process.versions.node);

import { readFileSync } from "node:fs";
//getProperty
console.log(JSON.parse(readFileSync("C:\\Users\\hp\\OneDrive\\Escritorio\\johandry\\VSC\\Packages\\EveDB\\schemes\\definitions.json").toString()));