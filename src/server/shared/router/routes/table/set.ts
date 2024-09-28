import { HTTPCodes, HTTPMethods } from "src/server/shared/constants";
import { $replacer } from "src/server/shared/functions/miscellaneous";
import { ErrorMessages } from "src/server/shared/messages/error.messages";
import { Keywords } from "src/server/shared/messages/messages.keyword";
import { RouteParamValue } from "src/types";
import { Route } from "../../route.builder";

const $route = "/table/set";
const $params = [{
  "name": "table",
  "description": "Table to obtain or use",
  "value": RouteParamValue.string,
  "default": null
}, {
  "name": "key",
  "description": "Key to obtain",
  "value": RouteParamValue.string,
  "default": null
}];
export default new Route($route, "Add or edit a value within a table or an entire table!", $params, (ctx) => {
  const $table = ctx.url.searchParams.get("table");
  const $key = ctx.url.searchParams.get("key");

  if (ctx.request.method !== HTTPMethods.POST) return ctx.send(HTTPCodes.BadRequest, {
    message: $replacer(ErrorMessages.invalid_method, {
      [Keywords.method]: ctx.request.method ?? HTTPMethods.GET,
      [Keywords.expected]: HTTPMethods.POST
    })
  });

  const missing: string[] = [];
  if (!$table) missing.push($params[0].name);
  if (!$key) missing.push($params[1].name);
  if (missing.length > 0) return ctx.send(HTTPCodes.BadRequest, {
    message: $replacer(ErrorMessages.missing_params, {
      [Keywords.params]: missing.join(", ")
    }),
    params: $params
  });

  ctx.request.json().then(console.log);
  return ctx.send(HTTPCodes.Success, { message: "Hi!" });
});