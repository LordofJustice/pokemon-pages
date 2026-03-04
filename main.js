import {createApp} from "./src/app.js"

const main = () => {
  const types = [
      "all",
      "bug",
      "dark",
      "dragon",
      "electric",
      "fairy",
      "fighting",
      "fire",
      "flying",
      "ghost",
      "grass",
      "ground",
      "normal",
      "poison",
      "psychic",
      "rock",
      "steel",
      "water",
    ];
  const pokemonsData = Deno.readTextFileSync("./data/pokemons.json");
  const pokemons = JSON.parse(pokemonsData);
  const app = createApp(pokemons, types);
  Deno.serve({port : 8000}, app.fetch);
}

main();