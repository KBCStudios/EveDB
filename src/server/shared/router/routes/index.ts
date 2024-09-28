import { NodeServer } from "src/server/node";
import type { JSONObject } from "src/types";
import { HTTPCodes } from "../../constants";
import { Route } from "../route.builder";

export default new Route(
  "/",
  "The main page, get all endpoints",
  [],
  (ctx) => ctx.send(HTTPCodes.Success, {
    distribution: ctx.server instanceof NodeServer ? "Node" : "Bun",
    endpoints: ctx.server.router.map((r) => ({ path: r.pathname, description: r.description, params: r.params })) as unknown as JSONObject
  })
);