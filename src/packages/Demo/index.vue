<template>
  <div class="demo">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup>
import { ref, } from 'vue-demi'
// defineOptions({
//   name: 'Demo',
// });
const title = ref('Demoss')
console.log(title?.value)

</script>

<style scoped>

</style>
