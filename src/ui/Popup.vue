<template>
  <div id="nav">
    <router-link class="link" to="/">Home</router-link> |
    <router-link class="link" to="/custom">Custom</router-link> |
    <router-link class="link" to="/about">About</router-link>
    <GlobalOptions />
    <router-view />
  </div>
</template>
<script lang="ts">
import GlobalOptions from '@/ui/components/GlobalOptions.vue';
export default {
  components: {
    GlobalOptions,
  },
};
</script>
<style lang="scss">
#app {
  min-width: 50em;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1.5em;
  }

  a.router-link-exact-active {
    color: #42b983;
  }
}
</style>
