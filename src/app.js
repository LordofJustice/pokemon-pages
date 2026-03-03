import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

const servePokemonPage = (c) => {
  const pokemons = c.get("pokemons");
  const requestedType = c.req.query("type");
  const types = c.get("types");
  const searched = c.req.query("search")
  console.log({specific: searched, requestedType})
  const filteredPokemons = pokemons.filter(({ types, name }) =>
    requestedType === "all" || types.includes(requestedType) || name.includes(searched)
  );

  const eta = c.get("eta");
  const page = eta.render("./pokemons.html", {
    pokemons: filteredPokemons,
    type: requestedType,
    types,
  });

  return c.html(page);
};

const showAllPokemons = (c) => {
  return c.redirect("/pokemons?type=all")
}

export const createApp = (pokemons, types, eta) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (c, next) => {
    c.set("types", types);
    c.set("pokemons", pokemons);
    c.set("eta", eta);
    await next();
  });

  app.get('/', showAllPokemons)
  app.get("/pokemons", servePokemonPage);
  app.get("/css/*", serveStatic({root: "public"}))
  return app;
};
