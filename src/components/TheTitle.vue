<template>
  <div class="title">
    <div class="titleText">
      <slot/>
    </div>
    <div class="titleText titleText_yellow">
    <slot name="yellow"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
};
</script>

<style lang="stylus" scoped>
.title {
  max-width: 280px;
  text-align center
}

.titleText {
  getFontH1()
  color: $colorFiller;
  &_yellow {
    color: $colorAccent;
  }
}
</style>
