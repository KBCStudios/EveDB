import { readFileSync } from "node:fs";
import { setProperty } from "dot-prop";
import { error, warn } from "src/auxiliar/logger";
import type { JSONObject, JSONValues } from "src/types";
import { ErrorMessages } from "../../messages/error.messages";
import { Keywords } from "../../messages/messages.keyword";
import { WarnMessages } from "../../messages/warn.messages";
import { $insert } from "../insert";
import { $isJV, $replacer } from "../miscellaneous";

const $function = "$set";

/**
 * Set a value on a table
 * @param path Table path
 * @param key Dot path to set
 * @param value Value to set
 */
export function $set(path: string, key: string, value: JSONValues) {
  if (!$isJV(value)) {
    error($replacer(ErrorMessages.invalid_jvalue, {
      [Keywords.value]: `${value}`
    }), $function);
    return;
  }
  let data: JSONObject;
  try {
    data = JSON.parse(readFileSync(path).toString());
  } catch (e) {
    data = {};
    warn(WarnMessages.no_json, $function);
  }
  setProperty(data, key, value);
  $insert(path, data);
}