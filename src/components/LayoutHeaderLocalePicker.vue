<template>
  <div class="layoutHeaderLocalePicker">
    <button
      class="currentValue"
      :class="{ active: locale === 'ru' }"
      @click="pickLang('ru')"
    >
      ru
    </button>
    <button
      class="currentValue"
      :class="{ active: locale === 'de' }"
      @click="pickLang('de')"
    >
      de
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import langsList from '@/langs/allowedLangs';
import Cookies from 'js-cookie';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LayoutHeaderLocalePicker',
  components: {
  },

  props: {

  },

  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    const router = useRouter();
    const pickLang = (lang) => {
      Cookies.set('lang', lang);
      locale.value = lang;

      router.replace({
        name: router.currentRoute.value.name,
        params: { lang },
      });
    };

    return {
      langsList,
      pickLang,
      locale,
    };
  },

});
</script>

<style lang="stylus" scoped>
.layoutHeaderLocalePicker {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  padding-top: 40px;
}

.currentValue {
  color: $colorFiller;
  text-transform: uppercase;
  border-bottom: 1px solid $colorFiller;

  &:first-child {
    margin-right: 10px;
  }

  getFontSubtitle();
  line-height: 14px;

  &.active {
    color: $colorAccent;
    border-bottom: 1px solid $colorAccent;
  }
}
</style>
