import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { warn } from "src/auxiliar/logger";
import { Server as $config_file, ServerScheme } from "src/config.names";
import { WarnMessages } from "src/server/shared/messages/warn.messages";

const ajv = addFormats(new Ajv({
  allErrors: true,
  strict: true
}));

ajv.addSchema(JSON.parse(readFileSync("schemes/definitions.json", "utf-8")), "definitions.json");
const validator = ajv.compile(JSON.parse(readFileSync("schemes/server.scheme.json", "utf-8")));

const $function = "$SERVER_CONFIG";

export function $config() {
  const $path = join(process.cwd(), $config_file);
  let json: ServerScheme;
  if (!existsSync($path)) {
    warn(WarnMessages.default_config, $function);
    json = ServerScheme;
    writeFileSync($path, JSON.stringify(json, null, 2));
  } else json = JSON.parse(readFileSync($path, "utf-8"));

  return {
    valid: validator(json),
    errors: validator.errors,
    json
  };
}