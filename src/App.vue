<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">

.size{
  width: 100%;
  height: 100%;
}

html,body{
  .size;
  overflow: auto;
  margin: 0;
  padding: 0;
  background-color:#FCFCFC;
}

#app {
  .size;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
