<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="success">
      <b-navbar-brand v-b-modal.modallg>Blog Post App</b-navbar-brand>
    </b-navbar>
    <router-view class="container"/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
