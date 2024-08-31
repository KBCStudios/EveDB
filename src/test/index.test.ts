/*
import { readFileSync } from "node:fs";
console.log(JSON.parse(readFileSync("C:\\Users\\hp\\OneDrive\\Escritorio\\johandry\\VSC\\Packages\\EveDB\\schemes\\definitions.json").toString()));
*/

/*
import { Router } from "src/server/shared/router/router";

const router = new Router();
router.load("routes");
console.log(router);
*/

/**
import { $config } from "src/validators/server.config";

console.log($config().errors?.map(e => `${e.instancePath}: ${e.message}\n\t\t`).join(""));
 */

import { BunServer } from "src/server/bun";

const server = new BunServer();
server.on("start", ($) => {
  console.log(`Listening: ${$.config.json.port}`);
});

server.start();