import type { MaybePromise, RouteParam } from "src/types";
import type { Context } from "./context.builder";

export class Route {
  constructor(
    readonly pathname: string,
    readonly description: string,
    readonly params: RouteParam[],
    readonly code: (ctx: Context) => MaybePromise<Response>) { }
}