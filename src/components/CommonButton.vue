<template>
  <button
    :class="[
      'button',
      { button_small: isSmall },
      { button_bordered: isBordered },
      { button_backgrounded: hasBackground },
    ]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CommonButton',

  props: {
    isBordered: Boolean,
    hasBackground: Boolean,
    isSmall: Boolean,
    text: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.button {
  padding: 14px 0;
  min-width: $width.phoneXs.buttonText;
  border-radius: 16px;
  border: 1px solid transparent;
  getFontButton();

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }

  +mediaTablet() {
    min-width: 248px;
  }

  &_small {
    padding: 10px 18px;
  }

  &_bordered {
    border-color: $colorAccent;
    color: $colorAccent;
  }

  &_backgrounded {
    background-color: $colorAccent;
    color: $colorBtn;
  }
}
</style>
