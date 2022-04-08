<template>
  <div class="contactItem">
    <span class="contactItemText">
      <slot/>
    </span>
    <div class="socialsBox">
      <socials-item v-for="link in links" :key="link.href" :link="link"/>
    </div>
  </div>
</template>

<script>
import SocialsItem from '@/components/SocialsItem.vue';

export default {
  name: 'ContactItem',
  components: {
    SocialsItem,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.contactItem {
  display flex
  justify-content: space-between
}

.contactItemText {
  getFontContact()
}

.socialsBox {
  display grid
  grid-auto-flow: column
  grid-column-gap: 16px
}
</style>
