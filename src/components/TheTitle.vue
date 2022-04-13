<template>
  <div class="title">
    <div :class="['titleText', { titleText_small: small }]">
      <slot />
    </div>
    <div :class="['titleText', 'titleText_yellow', { titleText_small: small }]">
      <slot name="yellow" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
  props: {
    small: Boolean,
  },
};
</script>

<style lang="stylus" scoped>
.title {
  text-align: center;
}

.titleText {
  getFontH1();
  color: $colorFiller;

  &_yellow {
    color: $colorAccent;
  }

  &_small {
    font-size: 20px;
    line-height: 24px;
  }
}
</style>
