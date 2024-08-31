import { readFileSync } from "node:fs";
import { getProperty, setProperty } from "dot-prop";
import { error, warn } from "src/auxiliar/logger";
import { ErrorMessages } from "src/server/shared/messages/error.messages";
import { Keywords } from "src/server/shared/messages/messages.keyword";
import { WarnMessages } from "src/server/shared/messages/warn.messages";
import type { JSONObject, JSONValues } from "src/types";
import { $insert } from "../../../insert";
import { $isJV, $replacer } from "../../../miscellaneous";

const $function = "$unshift";

export function $unshift(path: string, key: string, value: JSONValues) {
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
  let array = (getProperty(data, key) ?? []) as JSONValues[];
  if (!Array.isArray(array)) {
    warn($replacer(WarnMessages.no_valid_path, {
      [Keywords.value]: "valid array"
    }), $function);
    array = [];
  }
  array.unshift(value);
  setProperty(data, key, array);
  $insert(path, data);
}