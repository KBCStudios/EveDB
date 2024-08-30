export type JSONValues = string | number | boolean | null | JSONValues[] | JSONObject;
export type JSONObject = { [k: string]: JSONValues; };