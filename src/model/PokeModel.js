export async function getPokemonList(limit, currentPage, pokemonList, getEachPokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage - 1) * limit}`);
    const data = await response.json();
    const results = data.results;

    pokemonList.value = [];

    results.forEach((item) => {
      getEachPokemon(item, pokemonList);
    });
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
}

export async function getEachPokemon(result, pokemonList) {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + result.name);
    const data = await response.json();
    pokemonList.value.push(data);
    pokemonList.value.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
  }
}

export function getTypes(types) {
  return types.map((type) => type.type.name).join(", ");
}

export function getAbilities(abilities) {
  return abilities.map((ability) => ability.ability.name).join(", ");
}
