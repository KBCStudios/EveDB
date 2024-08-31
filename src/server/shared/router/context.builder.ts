import type { IncomingMessage, ServerResponse } from "node:http";
import type { BunServer } from "src/server/bun";
import { NodeServer } from "src/server/node";
import type { JSONObject } from "src/types";
import { Headers } from "../response.headers";

export class Context<
  Server = NodeServer | BunServer,
  $Request = IncomingMessage | Request
> {
  constructor(public server: Server, public request: $Request, public response?: ServerResponse) { }

  public send(status: number, json: JSONObject) {
    if (this.server instanceof NodeServer) {
      const res = this.response as ServerResponse;
      res.statusCode = status;
      res.setHeader(Headers.ContentType, Headers.JSON);
      res.end(JSON.stringify(json, null, 2));
    }

    return new Response(
      new Blob([JSON.stringify(json, null, 2)], {
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
}