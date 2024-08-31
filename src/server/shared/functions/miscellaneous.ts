import { JSONValuePrimitive } from "src/types/json.types";

/**
 * In a string it replaces words with your keywords
 * @param text Text to replace
 * @param replaces Replacements. Ex: { foo: “bar” }
 * @returns {string}
 */
export function $replacer(text: string, replaces: Record<string, string>) {
  return text.replace(/{(\w+)}/g, (_, key) => replaces[key] ?? `{${key}}`);
}

/**
 * Evaluates if a value is valid within a JSON
 * @param value Value to be evaluated
 * @returns {boolean}
 */
export function $isJV(value: unknown): boolean {
  if (
    JSONValuePrimitive.some(v => (typeof value) === v) ||
    value === null
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every($isJV);
  }

  if (typeof value === 'object' && value !== null) {
    if (Object.prototype.toString.call(value) === '[object Object]')
      return Object.values(value).every($isJV);
  }

  return false;
}