import { existsSync, rmSync } from "node:fs";
import { error } from "src/auxiliar/logger";
import { ErrorMessages } from "../../messages/error.messages";
import { Keywords } from "../../messages/messages.keyword";
import { $replacer } from "../miscellaneous";

const $function = "$delete";

/**
 * Delete a backup of a folder
 * @param file Backup file path to be deleted
 */
export function $delete(file: string) {
  if (!(/^.*\/\d+\.backup\.zip$/).test(file) || !existsSync(file)) {
    error($replacer(ErrorMessages.invalid_zipfile, {
      [Keywords.action]: "remove"
    }), $function);
    return false;
  }
  rmSync(file);
  return true;
}