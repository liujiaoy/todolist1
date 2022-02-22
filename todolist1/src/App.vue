<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss" scoped>
$error-color:red;
.test{
  
  color: $error-color;
}
</style>
