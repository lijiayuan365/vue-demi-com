<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { isVue2, ref } from 'vue-demi';
import * as vue from 'vue';


console.log('isVue2', isVue2, vue?.version);

const count = ref(0)
</script>

<template>
  <div>
    <button @click="count++">count is: {{ count }}</button>
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>
    
    <main>
      <TheWelcome />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
