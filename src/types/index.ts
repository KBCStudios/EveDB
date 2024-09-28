export * from "./json.types";
export * from "./router.types";

export type MaybePromise<T> = Promise<T> | T;
export type Union<T, K> = T & K;