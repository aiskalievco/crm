<template>
  <div id="app">

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  body {
    margin: 0;
    padding: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  #app {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
