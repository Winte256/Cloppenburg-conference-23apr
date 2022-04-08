<template>
  <div class="socialsItem">
    <a class="socialsItemLink" :href="link.href" target="_blank" rel="noopener noreferrer">
      <img class="socialsItemImg" :src="require(`@/assets/images/${link.social}.png`)" :alt="link.social">
    </a>
  </div>
</template>

<script>
export default {
  name: 'SocialsItem',
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.socialsItem {
  display block
  width 32px
  height 32px
}

.socialsItemLink {
  &:hover {
    opacity: 0.6
  }
}
</style>
