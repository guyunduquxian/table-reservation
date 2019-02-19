<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  export default {
    
  }
</script>


<style lang="scss">
  html, body {
    height: 100%;

    &::-webkit-scrollbar {
        width:0;
        height:0;
    }
  }

  #app {
     height: 100%;
  }

</style>
