<template>
  <div class="home">
    <div class="titleWrap">
      <!-- <base-icon-svg :width="84" :height="84" viewBox="0 0 84 84">
        <heart-icon/>
      </base-icon-svg> -->
      <the-title class="home__title">
        {{ locale === "tr" ? "" : $t("Искренне поздравляем") }}
        <template v-slot:yellow>
          {{ $t("с Международным женским днём") }}
        </template>
      </the-title>
    </div>
    <p
      class="home__text text"
      v-html="$t('Специально к этому празднику мы')"
    ></p>

    <div class="sliderItemsBox">
      <div class="sliderItemsWrap">
        <sliderItems />
      </div>
    </div>

    <p
      class="home__text text"
      v-html="$t('Нажмите на кнопку Получить NFT')"
    ></p>

    <div class="home__buttonsBox buttonsBox">
      <common-button :hasBackground="true" @click="getNFT">{{
        loading ? $t("Загрузка") : $t("Получить NFT")
      }}</common-button>
    </div>
    <p class="home__policies policies">
      <span v-html="$t('Нажмимая на кнопку')"></span>

      <br /><br />
      <span v-html="$t('Для получения NFT')"></span>
    </p>

    <contacts-box />
  </div>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import CommonButton from '@/components/CommonButton.vue';
// import BaseIconSvg from '@/components/BaseIconSvg.vue';
// import HeartIcon from '@/components/SvgIcons/HeartIcon.vue';
import ContactsBox from '@/components/ContactsBox.vue';
import SliderItems from '@/components/SliderItems.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  sendGift, checkGift, setAwaitNFTCookie,
} from '../utils/metamask';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CommonButton,
    // BaseIconSvg,
    // HeartIcon,
    ContactsBox,
    SliderItems,
  },

  setup() {
    const loading = ref(false);
    const toast = useToast();
    const router = useRouter();
    const { locale, t } = useI18n({ useScope: 'global' });

    const goToNFTPage = () => {
      loading.value = false;
      toast(t('NFT уже получена'));
      setAwaitNFTCookie(1);
      router.push(`/${locale.value}/your-gift`);
    };
    const onError = (text = 'Что то пошло не так') => {
      loading.value = false;
      toast.error(t(text));
    };

    const getNFT = async () => {
      if (loading.value) {
        return;
      }

      loading.value = true;

      const currentGift = await checkGift();

      if (!currentGift) {
        loading.value = false;
        return;
      }

      if (currentGift !== '0') {
        goToNFTPage();
        return;
      }

      try {
        await sendGift();
      } catch (error) {
        console.error(error);
        onError('Неизвестная Ошибка при получении NFT');
        return;
      }

      loading.value = false;

      setAwaitNFTCookie(1);

      router.push(`/${locale.value}/your-gift`);
    };

    return {
      locale,

      loading,
      getNFT,
    };
  },
};
</script>

<style lang="stylus">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-bottom: 16px;
  }

  &__text {
    margin-bottom: 24px;

    &:nth-of-type(2) {
      margin-bottom: 32px;
    }
  }

  &__buttonsBox {
    margin-bottom: 8px;
  }
}

.text {
  max-width: $width.phoneXs.buttonText;
  getFontText();
  text-align: center;

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }
}

.policies {
  margin-bottom: 56px;
  text-align: center;
  max-width: 300px;
  getFontPolicies();
}

.policiesLink {
  color: $colorAccent;

  &:hover {
    color: $colorAccent;
    opacity: 0.6;
  }
}

.buttonsBox {
  display: grid;
  grid-row-gap: 16px;
}

.sliderItemsBox {
  margin-bottom: 24px;
  width: 100%;
  max-width: 320px;
  overflow-y: auto;
  padding-bottom: 15px;
  scrollbar-width: thin;
  scrollbar-color: $colorAccent #fff;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $colorAccent;
    border: 2px solid $colorAccent;
    border-radius: 6px;
  }
}

.sliderItemsWrap {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
}
</style>
