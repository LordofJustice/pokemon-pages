const createSideBarElement = (type, currentType) => {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", `/pokemons?type=${type}`);
  anchor.innerText = type;
  anchor.classList.add("nav-button");

  if (type === currentType) {
    anchor.classList.add(type, "cl")
  }

  return anchor;
};

export const createSideBarElements = (types, currentType) => 
  types.map((type) => createSideBarElement(type, currentType));

const createImageContainer = (img, name) => {
  const imageContainer = document.createElement('div');
  imageContainer.className = "image-container";

  const image = document.createElement("img");
  image.setAttribute('src', img);
  image.setAttribute('alt', name);
  imageContainer.appendChild(image);
  return imageContainer;
}

const createPokemonTypes = (types) => {
  const pokemonTypes = document.createElement("div");
  pokemonTypes.className = "pokemon-types";
  types.forEach(type => {
    const row = document.createElement('div');
    row.innerText = type;
    row.classList.add("type-name", type);
    pokemonTypes.appendChild(row);
  })
  return pokemonTypes;
}

const createHeader = (name, types) => {
  const header = document.createElement('div');
  header.className = "header";
  const pokemonName = document.createElement('h3');
  pokemonName.innerText = name;
  pokemonName.className = "pokemon-name";
  const pokemonTypes = createPokemonTypes(types)
  header.append(pokemonName, pokemonTypes);
  return header;
};

const createStat = (name, value) => {
  const stat = document.createElement('div');
  stat.className = 'attribute';

  const statName = document.createElement('div');
  statName.className = "name";
  statName.innerText = name;

  const statValue = document.createElement('div');
  statValue.className = "value";
  statValue.innerText = value;
  stat.append(statName, statValue);
  return stat;
}

const createStats = (stats) => {
  const attributes = document.createElement('div')
  attributes.className = "attributes";
  stats.forEach(({statName, value}) => {
    const stat = createStat(statName , value);
    attributes.appendChild(stat);
  });
  return attributes;
}

const createCard = ({name, stats, types, image}) => {
  const card = document.createElement('div');
  card.className = "card";
  const imageContainer = createImageContainer(image, name)
  const header = createHeader(name, types);
  const statsTable = createStats(stats);
  card.append(imageContainer, header, statsTable)
  return card;
}

export const createAllCards = (pokemons) => pokemons.map(createCard);