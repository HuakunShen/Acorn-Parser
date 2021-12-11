<template>
  <div id="nav" style="width: 50em; height: 50em">
    <router-link to="/">Home</router-link> | <router-link to="/custom">Custom</router-link> |
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>

<style>
#app {
  width: 70em;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 3px solid red;
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
