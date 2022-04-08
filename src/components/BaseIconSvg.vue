<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewbox"
    :fill="iconColor"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  name: 'BaseIconSvg',
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 32,
    },
    height: {
      type: [Number, String],
      default: 32,
    },
    viewbox: {
      type: String,
      default: '0 0 32 32',
    },
    iconColor: {
      type: String,
      default: '#fff',
    },
  },
};
</script>

<style scoped>
svg {
  display: inline-block;
}
</style>
