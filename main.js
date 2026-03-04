import {createApp} from "./src/app.js"

const main = () => {
  const typesData = Deno.readTextFileSync("./data/types.json")
  const pokemonsData = Deno.readTextFileSync("./data/pokemons.json");
  const pokemons = JSON.parse(pokemonsData);
  const types = JSON.parse(typesData);
  const app = createApp(pokemons, types);
  Deno.serve({port : 8000}, app.fetch);
}

main();