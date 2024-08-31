import { existsSync, mkdirSync } from "node:fs";
import AdmZip from "adm-zip";
import { error } from "src/auxiliar/logger";
import { ErrorMessages } from "../../messages/error.messages";
import { FromMessages } from "../../messages/from.messages";
import { Keywords } from "../../messages/messages.keyword";
import { $replacer } from "../miscellaneous";

const $function = "$consume";

/**
 * Unzips a file and creates or overwrites a directory
 * @param file File to unzip
 * @param path Final directory path
 */
export async function $consume(file: string, path: string) {
  if (!(/^.*\/\d+\.backup\.zip$/).test(file) || !existsSync(file)) {
    error($replacer(ErrorMessages.invalid_zipfile, {
      [Keywords.action]: "decompress"
    }), $function);
    return;
  }
  if (!existsSync(path)) mkdirSync(path);
  const zip = new AdmZip(file);
  await zip.extractAllToAsync(path, true, true, (err) => error(err?.stack ?? err?.message ?? "UNKNOWN", $replacer(FromMessages.unexpected, {
    [Keywords.from]: $function
  })));

  return true;
}