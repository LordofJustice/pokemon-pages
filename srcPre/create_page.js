const POKEMONS = Deno.readTextFileSync("./src/pokemons.json");

const TYPE_TO_HTML_MAPPER = {
  "all": "index.html",
  "bug": "bug.html",
  "dark": "dark.html",
  "dragon": "dragon.html",
  "electric": "electric.html",
  "fairy": "fairy.html",
  "fighting": "fighting.html",
  "fire": "fire.html",
  "flying": "flying.html",
  "ghost": "ghost.html",
  "grass": "grass.html",
  "ground": "ground.html",
  "normal": "normal.html",
  "poison": "poison.html",
  "psychic": "psychic.html",
  "rock": "rock.html",
  "steel": "steel.html",
  "water": "water.html",
};

const capitaliseWord = (word) => word.slice(0, 1).toUpperCase() + word.slice(1);

const createTypesHtml = (types) => {
  const html = [];
  types.forEach((type) => {
    const capitalisedType = capitaliseWord(type);
    const htmlLine = `<div class="type-name ${type}">${capitalisedType}</div>`;
    html.push(htmlLine);
  });
  return html.join("\n");
};

const createStatsHtml = (
  { weight, baseXP, hp, attack, defense, speed },
) => {
  return `<div class="attribute">
            <div class="name">Weight</div>
            <div class="value">${weight}</div>
          </div>
          <div class="attribute">
            <div class="name">BaseXp</div>
            <div class="value">${baseXP}</div>
          </div>
          <div class="attribute">
            <div class="name">HP</div>
            <div class="value">${hp}</div>
          </div>
          <div class="attribute">
            <div class="name">Attack</div>
            <div class="value">${attack}</div>
          </div>
          <div class="attribute">
            <div class="name">Defense</div>
            <div class="value">${defense}</div>
          </div>
          <div class="attribute">
            <div class="name">Speed</div>
            <div class="value">${speed}</div>
          </div>`;
};

const createImageHtml = (imageURL, name) =>
  `<img src="${imageURL}" alt="${name}">`;

const createOneCardHtml = (
  pokemonImage,
  pokemonName,
  pokemonType,
  pokemonAttributes,
) =>
  `<div class="card">
        <div class="image-container">
          ${pokemonImage}
        </div>
        <div class="header">
          <h3 class="pokemon-name">${pokemonName}</h3>
          <div class="pokemon-types">
             ${pokemonType}
            <div class="pokemon-type">
            </div>
          </div>
        </div>
        <div class="attributes">
          ${pokemonAttributes}
        </div>
      </div>`;

const createAnchorHtml = (type, isCurrentPage) => {
  const bgClass = isCurrentPage ? ` ${type} cl` : "";
  return `<a href="${
    TYPE_TO_HTML_MAPPER[type]
  }" class="nav-button${bgClass}">${type}</a>`;
};

const createSideBarHtml = (types, preferredType) => {
  const sideBarHtmls = [];
  for (const type of types) {
    const isCurrentPage = type === preferredType;
    const anchor = createAnchorHtml(type, isCurrentPage);
    sideBarHtmls.push(anchor);
  }
  return sideBarHtmls.join("\n");
};

const createHtmlPage = (pokemonCards, sideBar) =>
  `<html>
<head>
  <title>Pokedex</title>
  <link rel="stylesheet" href="../css/colors.css">
  <link rel="stylesheet" href="../css/poke_style.css">
  <style>
  </style>
</head>
<body>
  <main class="container">
    <nav>
      ${sideBar}
    </nav>
    <section class="cards-container">
      ${pokemonCards}
    </section>
  </main>
</body>
</html>`;

const filterPokemon = (allPokemon, type) =>
  allPokemon.filter(({ types }) => type === "all" || types.includes(type));

const createPokemonsCards = (pokemons) => {
  const pokemonsHtml = [];
  pokemons.forEach(({ name, image, types, stats }) => {
    const imageHtml = createImageHtml(image, name);
    const pokemonName = capitaliseWord(name);
    const pokemonTypesHtml = createTypesHtml(types);
    const pokemonStatsHtml = createStatsHtml(stats);
    const cardHtml = createOneCardHtml(
      imageHtml,
      pokemonName,
      pokemonTypesHtml,
      pokemonStatsHtml,
    );
    pokemonsHtml.push(cardHtml);
  });
  return pokemonsHtml.join("\n");
};

const createPage = (type, types, pokemons) => {
  const filteredPokemons = filterPokemon(pokemons, type);
  const cards = createPokemonsCards(filteredPokemons);
  const sideBar = createSideBarHtml(types, type);
  return createHtmlPage(cards, sideBar);
};

const main = () => {
  const types = Object.keys(TYPE_TO_HTML_MAPPER);
  const pokemons = JSON.parse(POKEMONS);
  for (const type of types) {
    const page = createPage(type, types, pokemons);
    Deno.writeTextFileSync(`./pages/${TYPE_TO_HTML_MAPPER[type]}`, page);
  }
};

main();
