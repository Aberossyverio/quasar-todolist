<template>
  <q-page class="column flex-center q-pa-md q-gutter-md q-radius-md">
    <q-img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" style="width: 300px;"
      :fit="contain" />
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

    <div v-else class="column flex-center q-gutter-md px-10">
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
import { getPokemonList, getEachPokemon, getTypes, getAbilities } from "../model/PokeModel";

export default {
  setup() {
    const pokemonList = ref([]);
    const selectedPokemon = ref(null);
    const currentPage = ref(1);
    const limit = 21;

    onMounted(() => getPokemonList(limit, currentPage.value, pokemonList, getEachPokemon));

    function showPokemonDetails(pokemon) {
      selectedPokemon.value = pokemon;
    }

    function nextPage() {
      currentPage.value++;
      getPokemonList(limit, currentPage.value, pokemonList, getEachPokemon);
    }

    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
        getPokemonList(limit, currentPage.value, pokemonList, getEachPokemon);
      }
    }

    return {
      pokemonList,
      selectedPokemon,
      showPokemonDetails,
      getTypes,
      getAbilities,
      nextPage,
      previousPage
    };
  },
};
</script>
