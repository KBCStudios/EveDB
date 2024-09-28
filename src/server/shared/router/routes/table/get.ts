import { readdirSync } from "node:fs";
import { join } from "node:path";
import { getProperty } from "dot-prop";
import { HTTPCodes, TABLE_DIR } from "src/server/shared/constants";
import { $get } from "src/server/shared/functions/table/get";
import { type JSONObject, RouteParamValue, type Union } from "src/types";
import { Route } from "../../route.builder";

const $route = "/table/get";

export default new Route($route, "Get all tables, a specific table or a value of a table", [{
  "name": "table",
  "description": "Table to obtain or use",
  "value": RouteParamValue.string,
  "default": null
}, {
  "name": "key",
  "description": "Key to obtain",
  "value": RouteParamValue.string,
  "default": null
}], (ctx) => {
  const $folder = join(process.cwd(), ctx.server.config.json.path, TABLE_DIR);
  if (ctx.url.searchParams.get("table")) {
    const $data = $get(join($folder, `${ctx.url.searchParams.get("table")}.json`));
    const $key = ctx.url.searchParams.get("key");
    if ($key) return ctx.send(HTTPCodes.Success, {
      key: $key,
      value: getProperty($data, $key) ?? null
    });
    return ctx.send(HTTPCodes.Success, $data);
  }
  const $tables: Union<{ $list?: string[]; }, { [k: string]: JSONObject; }> = {};
  $tables.$list = readdirSync($folder).map(t => t.replace(".json", ""));
  for (const table of $tables.$list) $tables[table] = $get(join($folder, `${table}.json`));

  return ctx.send(HTTPCodes.Success, $tables);
});