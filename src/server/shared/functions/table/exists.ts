import { existsSync, readFileSync } from "node:fs";
import { getProperty } from "dot-prop";
import type { JSONObject } from "src/types";

/**
 * Check if a table exists
 * @param path Table path
 */
export function $exists(path: string): boolean;
/**
 * Check if a property on a table exists
 * @param path Table path
 * @param key Dot path to check
 */
export function $exists(path: string, key: string): boolean;
export function $exists(path: string, key?: string): boolean {
  if (!existsSync(path)) return false;
  let data: JSONObject;
  try {
    data = JSON.parse(readFileSync(path).toString());
  } catch (e) {
    data = {};
  }
  if (!key) return true;
  return Boolean(getProperty(data, key));
};