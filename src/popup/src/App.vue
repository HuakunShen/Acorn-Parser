<template>
  <v-app>
    <div id="popup">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
export default {};
</script>

<style lang="scss" scoped>
#popup {
  min-width: 50rem;
  min-height: 50rem;
  border: 2px solid red;
  text-align: center;
}
</style>
