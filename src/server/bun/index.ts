import { type Serve, serve } from "bun";
import { BaseServer } from "../base.server";
import { Context } from "../shared/router/context.builder";
import not_found from "../shared/router/not.found";

export class BunServer extends BaseServer<BunServer> {
  override server: Serve;

  constructor() {
    super("NodeServer");
    this.server = serve({
      fetch: (req) => {
        const url = new URL(req.url);
        const route = this.router.get(url.pathname);
        const ctx = new Context(this, req);
        if (!route) {
          return not_found(ctx);
        }

        return route.code(ctx);
      },
      port: this.config.json.port
    });
  }

  public start(): void {
    this.$start();
  }
}