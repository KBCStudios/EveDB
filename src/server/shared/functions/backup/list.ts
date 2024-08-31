import { existsSync, readdirSync, statSync } from "node:fs";
import { warn } from "src/auxiliar/logger";
import { ErrorMessages } from "../../messages/error.messages";
import { Keywords } from "../../messages/messages.keyword";
import { $replacer } from "../miscellaneous";
import { $regexp } from "./shared";

const $function = "$list";

/**
 * Get all backups in one folder
 * @param folder Folder to obtain
 */
export function $list(folder: string): string[] {
  if (!existsSync(folder) || !statSync(folder).isDirectory()) {
    warn($replacer(ErrorMessages.invalid_directory, {
      [Keywords.path]: folder
    }), $function);
    return [];
  }
  return readdirSync(folder).filter((w) => $regexp.file.test(w));
}