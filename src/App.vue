<template>
  <div class="base-wrapper">
    <div class="base-container">
      <the-header />
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
};
</script>

<style lang="stylus">
@import '@/assets/styles/normalize.css';
@import '@/assets/styles/main.css';

#app {
  color: $colorFiller;
}

.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-image: $colorBg;
}

.base-container {
  padding: 0 8px;
  margin: auto;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;

  +mediaPhoneS() {
    padding: 0 15px;
  }
}
</style>
