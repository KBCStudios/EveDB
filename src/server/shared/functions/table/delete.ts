import { readFileSync } from "node:fs";
import { deleteProperty } from "dot-prop";
import { error, warn } from "src/auxiliar/logger";
import type { JSONObject } from "src/types";
import { FromMessages } from "../../messages/from.messages";
import { Keywords } from "../../messages/messages.keyword";
import { WarnMessages } from "../../messages/warn.messages";
import { $insert } from "../insert";
import { $replacer } from "../miscellaneous";

const $function = "$delete";

/**
 * Deletes all data on a table
 * @param path Table path
*/
export function $delete(path: string);
/**
 * Deletes a property from a table
 * @param path Table path
 * @param key Dot path to delete
*/
export function $delete(path: string, key: string);
export function $delete(path: string, key?: string) {
  try {
    if (!key) {
      $insert(path, {});
      return;
    }
    let data: JSONObject;
    try {
      data = JSON.parse(readFileSync(path).toString());
    } catch (e) {
      data = {};
      warn(WarnMessages.no_json, $function);
    }
    deleteProperty(data, key);
    $insert(path, data);
    return;
  } catch (e) {
    error(e instanceof Error ? e.stack ?? e.message : String(e), $replacer(FromMessages.unexpected, {
      [Keywords.from]: $function
    }));
    return;
  }
}