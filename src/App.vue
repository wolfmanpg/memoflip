<template>
  <router-view></router-view>
</template>

<script>
import Intro from './components/Intro.vue';

export default {
  components: [
    Intro
  ],
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 150vh;
  @apply bg-third;
}
</style>
