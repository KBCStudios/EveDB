export const Server = "evedb.server.json";
export const Client = "evedb.client.json";

export const Default = {
  server: {
    "$schema": "https://raw.githubusercontent.com/KBCStudios/EveDB/main/schemes/server.scheme.json",
    "auth": "63a5937d-639b-456a-a9d5-ab106ce290a5",
    "port": 3000,
    "path": "./database/",
    "backup": {
      "enabled": true,
      "interval": 3600000
    },
    "safe": true,
    "tables": [
      "main"
    ]
  },
  client: {
    "$schema": "https://raw.githubusercontent.com/KBCStudios/EveDB/main/schemes/client.scheme.json",
    "auth": "63a5937d-639b-456a-a9d5-ab106ce290a5",
    "url": "http://localhost:3000/"
  }
} as const;

export const ServerScheme = {
  "$schema": "https://raw.githubusercontent.com/KBCStudios/EveDB/main/schemes/server.scheme.json",
  "auth": "63a5937d-639b-456a-a9d5-ab106ce290a5",
  "port": 3000,
  "path": "./database/",
  "backup": {
    "enabled": true,
    "interval": 3600000
  },
  "safe": true,
  "tables": [
    "main"
  ]
} as ServerScheme;
export type ServerScheme = {
  "$schema": "https://raw.githubusercontent.com/KBCStudios/EveDB/main/schemes/server.scheme.json",
  "auth": string,
  "port": number,
  "path": string,
  "backup": {
    "enabled": boolean,
    "interval": number;
  },
  "safe"?: boolean,
  "tables"?: string[];
};