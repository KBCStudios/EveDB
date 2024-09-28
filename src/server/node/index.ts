import { type IncomingMessage, type Server, type ServerResponse, createServer } from "node:http";
import { BaseServer } from "../base.server";
import { Context } from "../shared/router/context.builder";
import not_found from "../shared/router/not.found";

export class NodeServer extends BaseServer<NodeServer> {
  override server: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor() {
    super("NodeServer");
    this.server = createServer((req, res) => {
      // biome-ignore lint/complexity/useLiteralKeys:
      const url = new URL(`http://${process.env['HOST'] ?? 'localhost'}${req.url}`);
      const route = this.router.get(url.pathname ?? "/");
      const ctx = new Context(this, req, res);
      if (!route) {
        return not_found(ctx);
      }

      route.code(ctx);
    });
  }

  public start(): void {
    this.$start();
    this.server.listen(this.config.json.port);
  }
}