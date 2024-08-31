import { Route } from "../route.builder";

export default new Route(
  "/",
  "",
  [],
  (ctx) => ctx.send(200, {
    message: "Hello!"
  })
);