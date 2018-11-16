<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <span class="main-tag">A Good Form is </span>
      </router-link>
      | <router-link to="/dynamic-form">Dynamic</router-link> |
      <router-link to="/talkative-form">Talkative</router-link> |
      <router-link to="/talkative-form-too">Talkative Too</router-link> |
      <router-link to="/unbreakable-form">Unbreakable</router-link> |
      <router-link to="/unbreakable-form-too">Unbreakable Too</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  background-color: #2c3e50;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #3bb881;
}

#nav {
  color: white;
  padding: 30px;
  a {
    font-weight: bold;
    color: white;
    opacity: 0.3;
    &:first-child {
      opacity: 1;
      text-decoration: none;
      color: #3bb881;
    }
    &.router-link-exact-active {
      color: white;
      opacity: 1;
    }
  }
}

li {
  margin-bottom: 1em;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  font-size: 3em;
}
</style>
