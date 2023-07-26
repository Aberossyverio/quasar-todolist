<template>
  <div class="w-full h-full">
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>
<script setup>
import Footer from "../components/MainFooter.vue";
import Navbar from "../components/NavigationBar.vue";
</script>
