import { readFileSync } from "node:fs";
import { getProperty, setProperty } from "dot-prop";
import { warn } from "src/auxiliar/logger";
import { Keywords } from "src/server/shared/messages/messages.keyword";
import { WarnMessages } from "src/server/shared/messages/warn.messages";
import type { JSONObject, JSONValues } from "src/types";
import { $insert } from "../../../insert";
import { $replacer } from "../../../miscellaneous";

const $function = "$shift";

export function $shift(path: string, key: string) {
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
  array.shift();
  setProperty(data, key, array);
  $insert(path, data);
}