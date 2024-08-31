import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { Route } from "./route.builder";

export class Router extends Map<string, Route> {
  load(path: string) {
    const $base = join(__dirname, path);
    for (const $route of readdirSync($base)) {
      const $path = join($base, $route);
      if (statSync($path).isDirectory()) {
        this.load($path);
        continue;
      }

      delete require.cache[require($path)];
      const route = require($path).default as Route;
      if (!route || !(route instanceof Route)) continue;
      this.set(route.pathname, route);
    }
  }
}