<template>
  <q-page>
    <header class="masthead">
      <div class="container">
        <div class="masthead-subheading">H O L A</div>
        <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
        <div class="q-gutter-md">
          <q-btn outline rounded color="white" :to="{ name: 'pokemon' }">
            PokeDex App
          </q-btn>
          <q-btn outline rounded color="white" :to="{ name: 'todolist' }">
            Todolist App
          </q-btn>
          <q-btn outline rounded color="white" :to="{ name: 'about' }">
            About
          </q-btn>
        </div>
      </div>
    </header>
  </q-page>
</template>
