<template>
  <q-layout view="hhh lpR fff">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-pa-md q-gutter-md q-radius-md">
          <q-avatar to="/">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple :to="{ name: 'index' }">
            <q-item-section>
              Welcome
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'todolist' }">
            <q-item-section>
              Todolist App
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'pokemon' }">
            <q-item-section>
              Pokedex App
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'about' }">
            <q-item-section>
              About
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="q-pa-md q-gutter-md q-radius-md">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="row flex-center">
          <div>© 2023 Copyright: Made with Quasar</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
