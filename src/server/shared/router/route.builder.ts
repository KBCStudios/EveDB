import type { MaybePromise, RouteParam } from "src/types";

export class Route {
  constructor(
    readonly pathname: string,
    readonly description: string,
    readonly params: RouteParam[],
    readonly code: () => MaybePromise<Response>) { }
}