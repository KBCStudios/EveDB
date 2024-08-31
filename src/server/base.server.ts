import EventEmitter from "node:events";
import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { ErrorObject } from "ajv";
import type { Serve } from "bun";
import { error } from "src/auxiliar/logger";
import type { JSONObject } from "src/types";
import { $config } from "src/validators/server.config";
import type { Events } from "./events";
import { $replacer } from "./shared/functions/miscellaneous";
import { ErrorMessages } from "./shared/messages/error.messages";
import { Keywords } from "./shared/messages/messages.keyword";
import { Router } from "./shared/router/router";

export class BaseServer extends EventEmitter<Events> {
  public readonly config: {
    valid: boolean;
    errors: ErrorObject<string, Record<string, unknown>, unknown>[] | null | undefined;
    json: JSONObject;
  };
  public readonly router: Router;
  public readonly server!: Server<typeof IncomingMessage, typeof ServerResponse> | Serve;
  constructor(name: string) {
    super();
    this.config = $config();
    if (this.config.errors) throw error($replacer(ErrorMessages.invalid_config, {
      [Keywords.config]: `\n\t\t${this.config.errors.map(e => `${e.instancePath}: ${e.message}\n\t\t`).join("")}`
    }), name);

    this.router = new Router();
  };
}