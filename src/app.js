import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

const servePokemonByName = (c) => {
  const pokemons = c.get('pokemons');
  const {type, name} = c.req.query();
  console.log(type, name)
  const filteredPokemons = pokemons.filter((pokemon) => {
    return pokemon.types.includes(type) || pokemon.name.includes(name) || type === 'all'
  })
  return c.json(filteredPokemons);
};

const homePage = (c) => {
  const page = Deno.readTextFileSync('./public/template/pokemons.html')
  return c.html(page);
}

const servePokemonsData = (c) => {
  const pokemons = c.get('pokemons');
  return c.json(pokemons);
}

const servePokemonsTypes = (c) => {
  const types = c.get('types');
  return c.json(types);
}

export const createApp = (pokemons, types) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (c, next) => {
    c.set("types", types);
    c.set("pokemons", pokemons);
    await next();
  });
  
  app.get('/', homePage)
  app.get("/pokemons", servePokemonByName);
  app.get("/css/*", serveStatic({root: "public"}))
  app.get("/js/*", serveStatic({root: "public"}))
  app.get("/data/pokemons.json", servePokemonsData)
  app.get("/data/types.json", servePokemonsTypes)
  return app;
};
