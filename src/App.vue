<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 10px;
    &.router-link-exact-active {
      color: #c44141;
    }
  }
}
button {
  margin: 5px 10px;
  cursor: pointer;
}
</style>
