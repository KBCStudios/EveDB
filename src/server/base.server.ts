import EventEmitter from "node:events";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import type { Server as HTTPServer, IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import type { ErrorObject } from "ajv";
import type { Serve } from "bun";
import { error, warn } from "src/auxiliar/logger";
import { $capitalize } from "src/auxiliar/miscellaneous";
import { ServerScheme } from "src/config.names";
import { $config } from "src/validators/server.config";
import type { Events } from "./events";
import { $replacer } from "./shared/functions/miscellaneous";
import { ErrorMessages } from "./shared/messages/error.messages";
import { Keywords } from "./shared/messages/messages.keyword";
import { WarnMessages } from "./shared/messages/warn.messages";
import { Router } from "./shared/router/router";

const Distributions = {
  bun: "bun",
  node: "node"
};

export class BaseServer<Server> extends EventEmitter<Events<Server>> {
  public readonly config: {
    valid: boolean;
    errors: ErrorObject<string, Record<string, unknown>, unknown>[] | null | undefined;
    json: ServerScheme;
  };
  public readonly router: Router;
  public server!: HTTPServer<typeof IncomingMessage, typeof ServerResponse> | Serve;
  constructor(private name: string) {
    super();
    this.config = $config();
    if (this.config.errors) throw error($replacer(ErrorMessages.invalid_config, {
      [Keywords.config]: `\n\t\t${this.config.errors.map(e => `${e.instancePath}: ${e.message}\n\t\t`).join("")}`
    }), name);

    this.router = new Router();
  };

  protected $start() {
    const $base = join(process.cwd(), this.config.json.path);

    const folders = {
      $base,
      $tables: join($base, "tables"),
      $backups: join($base, "backups")
    };
    for (const folder in folders)
      if (!existsSync(folders[folder])) mkdirSync(folders[folder]);

    for (const table of this.config.json.tables ?? ServerScheme.tables as string[]) {
      const $path = join(folders.$tables, `${table}.json`);
      if (!existsSync($path)) writeFileSync($path, '{}');
    }

    this.router.load("routes");

    this.emit("start", this as unknown as Server);

    if (!this.server) warn($replacer(WarnMessages.base_server, {
      [Keywords.suggest]: $capitalize(Distributions.bun in process.versions ? Distributions.bun : Distributions.node)
    }), this.name);
  }
}