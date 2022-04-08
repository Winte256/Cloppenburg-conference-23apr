<template>
  <base-icon-svg :width="12" :height="12" viewBox="0 0 12 12" class="spinner">
    <SimpleLogo />
  </base-icon-svg>
</template>

<script >
import BaseIconSvg from '@/components/BaseIconSvg.vue';
import SimpleLogo from '@/components/SvgIcons/SimpleLogo.vue';

export default {
  name: 'CommonSpinner',
  components: {
    BaseIconSvg,
    SimpleLogo,
  },
  props: {},
};
</script>
<style lang="stylus">
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
<style lang="stylus" scoped>
.spinner {
  animation: rotating 1.7s linear infinite;
  width: 40px;
  height: 40px;
  color: $colorFiller;
}
</style>
