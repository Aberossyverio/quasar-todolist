<template>
  <q-page class="row flex-center q-pa-md q-gutter-md q-radius-md">
    <div v-if="!selectedPokemon" class="h-full row wrap px-10">
      <q-col class="column" v-for="item in pokemonList" :key="item.id">
        <q-card dark bordered class="bg-grey-9 my-card q-mb-md q-mr-md" @click="showPokemonDetails(item)">
          <q-card-section class="column flex-center">
            <img :src="item.sprites.front_default" alt="">
            <div class="text-subtitle2">{{item.name}}</div>
          </q-card-section>
        </q-card>
      </q-col>
    </div>

    <div v-else>
      <q-card dark bordered class="bg-grey-9 my-card q-mb-md q-mr-md" @click="selectedPokemon = null">
        <q-card-section class="column flex-center">
          <img :src="selectedPokemon.sprites.front_default" alt="">
          <div class="text-subtitle2">{{selectedPokemon.name}}</div>
          <div class="text-caption">Type: {{getTypes(selectedPokemon.types)}}</div>
          <div class="text-caption">Weight: {{selectedPokemon.weight}}</div>
        </q-card-section>
      </q-card>
      <q-btn label="Back" @click="selectedPokemon = null" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const pokemonList = ref([]);
    const selectedPokemon = ref(null);

    onMounted(getPokemonList);

    async function getPokemonList() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const data = await response.json();
        const results = data.results;
        console.log(results);

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

    return {
      pokemonList,
      selectedPokemon,
      getPokemonList,
      getEachPokemon,
      showPokemonDetails,
      getTypes,
    };
  },
};
</script>
