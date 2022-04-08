<template>
  <layout-header-locale-picker />
  <header class="header">
    <logo-component />
  </header>
</template>

<script>
import LogoComponent from '@/components/LogoComponent.vue';
import LayoutHeaderLocalePicker from './LayoutHeaderLocalePicker.vue';

export default {
  name: 'TheHeader',
  components: {
    LogoComponent,
    LayoutHeaderLocalePicker,
  },
};
</script>

<style lang="stylus" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 24px;
}
</style>
