<template>
  <header class="masthead">
    <div class="container">
      <div class="masthead-subheading">H O L A</div>
      <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
      <div class="q-gutter-md">
        <router-link to="/about">
          <q-btn outline rounded color="white">
            About
          </q-btn>
        </router-link>
        <router-link to="/todo">
          <q-btn outline rounded color="white">
            Todolist App
          </q-btn>
        </router-link>
      </div>
    </div>
  </header>
</template>
