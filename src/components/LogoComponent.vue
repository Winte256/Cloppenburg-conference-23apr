<template>
  <router-link to="/" class="logo">
    <base-icon-svg
      class="logoIcon"
      :width="78"
      :height="33"
      viewBox="0 0 78 33"
    >
      <logo-icon />
    </base-icon-svg>
  </router-link>
</template>

<script>
import BaseIconSvg from '@/components/BaseIconSvg.vue';
import LogoIcon from '@/components/SvgIcons/LogoIcon.vue';

export default {
  name: 'LogoComponent',
  components: {
    BaseIconSvg,
    LogoIcon,
  },
};
</script>

<style lang="stylus" scoped>
.logoIcon {
  display: block;
  width: 117px;
  height: 49px;
}
</style>
