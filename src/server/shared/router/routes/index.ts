import { Route } from "../route.builder";

export default new Route(
  "/",
  "",
  [],
  () => new Response("Hi!")
);