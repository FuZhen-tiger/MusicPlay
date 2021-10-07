<template>
  <div id="app">
    <top />
    <index />
  </div>
</template>

<script>
import top from './components/01.top'
import index from './components/02.index'
export default {
  name: 'app',
  components:{
    top,
    index
  }
}
</script>

<style>
#app{
  height: 100%;
}
</style>
