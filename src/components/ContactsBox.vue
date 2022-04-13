<template>
  <div class="contactsBox">
    <contact-item
      class="contactsBox__item"
      v-for="contact in contacts"
      :key="contact.title"
      :links="contact.links"
      >{{ $t(contact.title) }}</contact-item
    >
  </div>
</template>

<script>
import ContactItem from '@/components/ContactItem.vue';

export default {
  name: 'ContactsBox',
  components: {
    ContactItem,
  },
  data() {
    return {
      contacts: [
        {
          title: 'Анатолий Илле',
          links: [
            {
              href: 'https://instagram.com/anatolille',
              social: 'instagram',
            },
            {
              href: 'https://t.me/OTON20000NODE',
              social: 'telegram',
            },
          ],
        },
        {
          title: 'Антон Эльстон',
          links: [
            {
              href: 'https://instagram.com/elston.anton',
              social: 'instagram',
            },
            {
              href: 'https://t.me/antonelston',
              social: 'telegram',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.contactsBox {
  width: 100%;

  // border-top: 1px solid $colorPurple;
  // border-radius: 12px 12px 0px 0px;
  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }

  &__item {
    position: relative;
    padding-top: 32px;
    padding-bottom: 16px;

    &::before {
      position: absolute;
      content: '';
      top: 16px;
      width: 100%;
      height: 1px;
      background-color: $colorPurple;
    }

    &:nth-of-type(2) {
      padding-top: 16px;
      padding-bottom: 37px;

      &::before {
        top: 0;
      }
    }
  }
}
</style>
