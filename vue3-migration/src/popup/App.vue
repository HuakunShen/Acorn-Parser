<template>
  <div id="nav">
    <router-link to="/">Home</router-link> | <router-link to="/custom">Custom</router-link> |
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>
<script lang="ts">
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['initAH']),
  },
  mounted() {
    this.initAH();
  },
};
</script>
<style>
#app {
  min-width: 50em;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
