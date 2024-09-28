import { IncomingMessage, type ServerResponse } from "node:http";
import type { BunServer } from "src/server/bun";
import { NodeServer } from "src/server/node";
import type { JSONObject } from "src/types";
import { Headers } from "../response.headers";

export class Context {
  constructor(public server: NodeServer | BunServer, public request: IncomingMessage | Request, public response?: ServerResponse) { }

  get url() {
    // biome-ignore lint/complexity/useLiteralKeys:
    return new URL(this.request instanceof IncomingMessage ? `http://${process.env['HOST'] ?? 'localhost'}${this.request.url}` : (this.request as Request).url);
  }

  public send(status: number, json: JSONObject) {
    const $ = {
      meta: {
        status,
        endpoint: this.url.pathname
      },
      data: json
    };
    if (this.server instanceof NodeServer) {
      const res = this.response as ServerResponse;
      res.statusCode = status;
      res.setHeader(Headers.ContentType, Headers.JSON);
      res.end(JSON.stringify($, null, 2));
    }

    return new Response(
      new Blob([JSON.stringify($, null, 2)], {
        type: Headers.JSON
      }),
      {
        headers: {
          [Headers.ContentType]: Headers.JSON
        },
        status
      }
    );
  }

  public data() {
    return new Promise((res, rej) => {
      if (this.request instanceof Request) {
        res(this.request.json());
        return;
      }
      let body = '';
      this.request.on("data", chunk => { body += chunk.toString(); });
      this.request.on('end', () => {
        try {
          res(JSON.parse(body));
        } catch (e) {
          rej(null);
        }
      });
    });
  }
}