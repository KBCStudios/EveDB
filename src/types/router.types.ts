export enum RouteParamValue {
  string = "string",
  number = "number",
  integer = "integer",
  boolean = "boolean"
}

export interface RouteParam {
  name: string;
  description: string;
  value: RouteParamValue;
  default: string | number | boolean | null;
}