import { readFileSync } from "node:fs";
import { getProperty, setProperty } from "dot-prop";
import { error, warn } from "src/auxiliar/logger";
import { ErrorMessages } from "src/server/shared/messages/error.messages";
import { Keywords } from "src/server/shared/messages/messages.keyword";
import { WarnMessages } from "src/server/shared/messages/warn.messages";
import type { JSONObject } from "src/types";
import { $insert } from "../../../insert";
import { $replacer } from "../../../miscellaneous";

const $function = "$multi";

/**
 * Multiplies a value to a table key
 * @param path Table path
 * @param key Dot path to multiply
 * @param value Value to multi
 */
export function $multi(path: string, key: string, value: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    error($replacer(ErrorMessages.invalid_value, {
      [Keywords.expected]: "finite number",
      [Keywords.value]: typeof value
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

  let v = getProperty(data, key) ?? 1;
  if (typeof v !== "number") {
    v = 1;
    warn($replacer(WarnMessages.no_valid_path, {
      [Keywords.value]: "valid number"
    }), $function);
  }

  setProperty(data, key, v * value);
  $insert(path, data);
}