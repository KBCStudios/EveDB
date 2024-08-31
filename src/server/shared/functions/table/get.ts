import { existsSync, readFileSync } from "node:fs";
import { getProperty } from "dot-prop";
import { warn } from "src/auxiliar/logger";
import type { JSONObject, JSONValues } from "src/types";
import { Keywords } from "../../messages/messages.keyword";
import { WarnMessages } from "../../messages/warn.messages";
import { $replacer } from "../miscellaneous";

const $function = "$get";

/**
 * Get an entire table
 * @param path Table path
 */
export function $get(path: string): JSONObject;
/**
 * Get a property from a table
 * @param path Table path
 * @param key Dot path to get
 */
export function $get(path: string, key: string): JSONValues | null;
export function $get(path: string, key?: string): JSONObject | JSONValues | null {
  if (!existsSync(path)) {
    warn($replacer(WarnMessages.non_existent_route, {
      [Keywords.path]: path
    }), $function);
    return key ? null : {};
  }
  let data: JSONObject;
  try {
    data = JSON.parse(readFileSync(path).toString());
  } catch (e) {
    data = {};
    warn(WarnMessages.no_json, $function);
  }
  if (!key) return data;
  return getProperty(data, key) ?? null;
}