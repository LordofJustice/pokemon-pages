const createFragment = ([tag, attributes, ...content]) => {
  const element = document.createElement(tag);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }

  if ( typeof content[0] === "string" || typeof content[0] === 'number') {
    console.log(content)
    element.append(...content)
    return element;
  }

  element.append(...content.map(createFragment));
  return element;
}

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

const typesElements = (types) => types.map((type) => createFragment(['div', {class : `type-name ${type}`}, type]));

const createStat = ({statName, value}) => {
  const nameElement = createFragment(['div', {class : 'name'}, statName])
  const statElement = createFragment(['div', {class : 'value'}, value])
  const stat = createFragment(['div', {class : "attribute"}, "", nameElement, statElement])
  return stat;
}

const createCard = ({name, stats, types, image}) => {
  const typesEl = typesElements(types);
  const attributes = stats.map((stat) => createStat(stat));
  const card1 = [
    'div', {class : 'card'}, 
    [
      "div", {class : 'image-container'}, ["img", {src: image, alt: name}, ""]
    ],
    [
      "div", {class : 'header'},
      [
        "h3", {class : 'pokemon-name'}, name
      ], 
      [
        'div', {class : "pokemon-types"}, "", ...typesEl
      ]
    ],
    [
      'div', {class : 'attributes'}, "", ...attributes
    ]
  ];
  return createFragment(card1);
}

export const createAllCards = (pokemons) => pokemons.map(createCard);