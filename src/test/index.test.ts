/*
import { readFileSync } from "node:fs";
console.log(JSON.parse(readFileSync("C:\\Users\\hp\\OneDrive\\Escritorio\\johandry\\VSC\\Packages\\EveDB\\schemes\\definitions.json").toString()));
*/

import { Router } from "src/server/shared/router/router";

const router = new Router();
router.load("routes");
console.log(router);