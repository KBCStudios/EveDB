import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import AdmZip from "adm-zip";
import { error } from "src/auxiliar/logger";
import { ErrorMessages } from "../../messages/error.messages";
import { FromMessages } from "../../messages/from.messages";
import { Keywords } from "../../messages/messages.keyword";
import { $replacer } from "../miscellaneous";

const $function = "$create";

/**
 * Compress an entire directory into a single compressed file
 * @param folder Directory to compress
 * @param file Compressed file path
 */
export async function $create(folder: string, file: string) {
  try {
    if (!existsSync(folder) || !statSync(folder).isDirectory()) return error($replacer(ErrorMessages.invalid_directory, {
      [Keywords.path]: folder
    }), $function);
    const zip = new AdmZip();

    for (const module of readdirSync(folder)) zip.addFile(module, readFileSync(join(folder, module)));

    zip.writeZip(file);
    return true;
  } catch (e) {
    error(e instanceof Error ? e.stack ?? e.message : String(e), $replacer(FromMessages.unexpected, {
      [Keywords.from]: $function
    }));
    return false;
  }
}