const pokeApi = (pokemonId) => `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

const capitalizeWord = (word) => word.slice(0, 1).toUpperCase() + word.slice(1);

const getBaseStats = (pokemon) =>
  pokemon.stats.map(
    ({ base_stat, stat }) => ({
      statName: capitalizeWord(stat.name),
      value: base_stat,
    }),
  ).filter((stat) => !["Special-attack", "Special-defense"].includes(stat.statName));

const getStats = (pokemon) => {
  const baseStats = getBaseStats(pokemon);
  return [{ statName: "Weight", value: pokemon.weight }, {
    statName: "BaseXp",
    value: pokemon.base_experience,
  }, ...baseStats];
};

const getImageURL = (pokemon) =>
  pokemon.sprites.other["official-artwork"]["front_default"];

const getPokemonTypes = (pokemon) =>
  pokemon.types.map((slot) => slot.type.name);

const getPokemon = (pokemonId, response) => {
  const pokemon = {};
  pokemon.id = pokemonId;
  pokemon.name = response.name;
  pokemon.image = getImageURL(response);
  pokemon.types = getPokemonTypes(response);
  pokemon.stats = getStats(response);
  return pokemon;
};

const getPokemons = async (noOfPokemon) => {
  const pokemons = [];
  for (let pokemonId = 1; pokemonId <= noOfPokemon; pokemonId++) {
    const api = pokeApi(pokemonId);
    const response = await fetch(api).then((r) => r.json());
    const pokemon = getPokemon(pokemonId, response);
    console.log(pokemon);
    pokemons.push(pokemon);
  }
  return pokemons;
};

const main = async () => {
  const noOfPokemon = 1025;
  const pokemons = await getPokemons(noOfPokemon);
  const jsonString = JSON.stringify(pokemons);
  Deno.writeTextFileSync("./src/pokemons.json", jsonString);
};

await main();
