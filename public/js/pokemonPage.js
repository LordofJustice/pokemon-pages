import { createAllCards, createSideBarElements } from "./createCard.js";

const addCardsAndSidebar = (pokemons, types, currentType) => {
  const sideBar = document.getElementById("side-bar");
  const sideBarElements = createSideBarElements(types, currentType);
  sideBar.append(...sideBarElements);

  const cardContainer = document.getElementById("cards-container");
  const allPokemonCards = createAllCards(pokemons);
  cardContainer.append(...allPokemonCards);
}

const updateCards = (pokemons) => {
  const cardContainer = document.getElementById("cards-container");
  const allPokemonCards = createAllCards(pokemons);
  cardContainer.replaceChildren(...allPokemonCards)
}

const updateSideBar = (types, currentType) => {
  const sideBar = document.getElementById("side-bar");
  const sideBarElements = createSideBarElements(types, currentType);
  sideBar.replaceChildren(...sideBarElements);
}

window.onload = async () => {
  const currentType = "all";
  const types = await fetch("/data/types.json").then((r) => r.json());
  const pokemons = await fetch("/data/pokemons.json").then((r) => r.json());
  addCardsAndSidebar(pokemons, types, currentType);

  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(searchBar);
    const name = formData.get('name')
    const fetchedPokemons =  await fetch(`/pokemons?name=${name}`).then(r => r.json());
    updateCards(fetchedPokemons)
    updateSideBar(types)
  })

  const sideBar = document.getElementById("side-bar");
  sideBar.addEventListener('click', async (e) => {
    e.preventDefault();
    const type = e.target.innerText;
    const fetchedPokemons =  await fetch(`/pokemons?type=${type}`).then(r => r.json());
    updateCards(fetchedPokemons);
    updateSideBar(types, type)
  })
};
