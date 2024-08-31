import { writeFileSync } from "node:fs";
import { error } from "src/auxiliar/logger";
import type { JSONObject } from "src/types/json.types";
import { ErrorMessages } from "../messages/error.messages";
import { Keywords } from "../messages/messages.keyword";
import { $replacer } from "./miscellaneous";

export function $insert(path: string, json: JSONObject) {
  try {
    writeFileSync(path, JSON.stringify(json, null, 2));
    return true;
  } catch (e) {
    error($replacer(ErrorMessages.invalid_path, {
      [Keywords.path]: path
    }), "$insert");
    return false;
  }
}