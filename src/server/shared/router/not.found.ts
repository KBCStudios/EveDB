import type { Context } from "./context.builder";

export default (ctx: Context) => ctx.send(200, { message: "Invalid or unknown route!" });