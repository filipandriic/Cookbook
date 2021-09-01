<template>
  <div id="app">
    <div id="nav">
      <Navigation></Navigation>
    </div>
    <div class="background">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.background {
  margin-top: 70px;
  height: calc(100vh - 70px);
  width: 100%;
  background-image: url("./assets/background3.jpg");
  background-size: cover;
  overflow: auto;
}

body {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
};
</script>