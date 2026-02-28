import {createApp} from "./src/app.js"
import {Eta} from "eta"

const main = () => {
  const eta = new Eta({views: "./public/template"});
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
  const app = createApp(pokemons, types, eta);
  Deno.serve({port : 8000}, app.fetch);
}

main();