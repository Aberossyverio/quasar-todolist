<template>
  <q-page class="column justify-center q-pa-md q-gutter-md q-radius-md">
    <q-img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
      style="max-width: 300px; height: 150px;" :fit="contain" />
    <div v-if="!selectedPokemon" class="h-full w-auto row wrap px-10 justify-center">
      <div class="row">
        <div class="col-4" v-for="item in pokemonList" :key="item.id">
          <q-card dark bordered class="bg-grey-9 my-card q-mb-md q-mr-md" @click="showPokemonDetails(item)">
            <q-card-section class="column flex-center">
              <img :src="item.sprites.front_default" alt="">
              <div class="text-subtitle2">{{ item.name }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="q-gutter-md">
        <q-btn outline rounded color="white" label="Previous" @click="previousPage" :disable="currentPage === 1" />
        <q-btn outline rounded color="white" label="Next" @click="nextPage" />
      </div>
    </div>

    <div v-else class="column justify-center q-gutter-md px-10">
      <q-card class="my-card h-full w-full q-pa-md q-gutter-md q-radius-md" flat bordered style="width: 500px;">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Pokemon detail</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ selectedPokemon.name }}</div>
            <div class="text-caption">Type: {{ getTypes(selectedPokemon.types) }}</div>
            <div class="text-caption">Weight: {{ selectedPokemon.weight }}</div>
            <div class="text-caption">Height: {{ selectedPokemon.height }}</div>
            <div class="text-caption">Species: {{ selectedPokemon.species.name }}</div>
            <div class="text-caption">Abilities: {{ getAbilities(selectedPokemon.abilities) }}</div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center pokemon-image">
            <img :src="selectedPokemon.sprites.front_default" alt="">
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card-section>
        <q-btn outline rounded color="white" label="Back" @click="selectedPokemon = null" class="q-mt-md" />
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const pokemonList = ref([]);
    const selectedPokemon = ref(null);
    const currentPage = ref(1);
    const limit = 21;

    onMounted(getPokemonList);

    async function getPokemonList() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage.value - 1) * limit}`);
        const data = await response.json();
        const results = data.results;

        pokemonList.value = [];

        results.forEach((item) => {
          getEachPokemon(item);
        });
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    }

    async function getEachPokemon(result) {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + result.name);
        const data = await response.json();
        pokemonList.value.push(data);
        pokemonList.value.sort((a, b) => a.id - b.id);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    }

    function showPokemonDetails(pokemon) {
      selectedPokemon.value = pokemon;
    }

    function getTypes(types) {
      return types.map((type) => type.type.name).join(", ");
    }

    function getAbilities(abilities) {
      return abilities.map((ability) => ability.ability.name).join(", ");
    }

    function getSpecies(species) {
      return species.map((species) => species.species.name).join(", ");
    }

    function nextPage() {
      currentPage.value++;
      getPokemonList();
    }

    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
        getPokemonList();
      }
    }

    return {
      pokemonList,
      selectedPokemon,
      getPokemonList,
      getEachPokemon,
      showPokemonDetails,
      getTypes,
      getAbilities,
      getSpecies,
      nextPage,
      previousPage
    };
  },
};
</script>
