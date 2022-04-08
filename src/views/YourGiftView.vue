<template>
  <div class="yourGift">
    <the-title class="home__title"> {{ $t("Ваш подарок") }} </the-title>
    <div v-if="awaitGift" class="loader">
      <CommonSpinner />
    </div>
    <div class="imageBox" v-else-if="+giftN > 0">
      <img
        class="image"
        :src="`https://oton.org/nft/drop_8_march/gift${giftN}.gif?123`"
        alt="nft flower"
      />
    </div>

    <div class="yourGift__buttonsBox buttonsBox">
      <common-button
        :hasBackground="true"
        v-if="buttonIsShown"
        @click="hideButton"
        >{{ $t("Добавить в Metamask") }}</common-button
      >
    </div>

    <ol class="instructions" v-if="!buttonIsShown">
      <li class="instructionsItem">{{ $t("instructionsItem1") }}</li>
      <li class="instructionsItem">{{ $t("instructionsItem2") }}</li>
      <li class="instructionsItem">{{ $t("instructionsItem3") }}</li>
      <li class="instructionsItem">{{ $t("instructionsItem4") }}</li>
      <li class="instructionsItem">
        {{ $t("instructionsItem5", { contractAddress }) }}
      </li>
      <li class="instructionsItem">{{ $t("instructionsItem6", { giftN }) }}</li>
      <li class="instructionsItem">{{ $t("instructionsItem7") }}</li>
      <li class="instructionsItem">{{ $t("instructionsItem8") }}</li>
    </ol>
    <contacts-box />
  </div>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import CommonButton from '@/components/CommonButton.vue';
import ContactsBox from '@/components/ContactsBox.vue';
import CommonSpinner from '@/components/CommonSpinner.vue';

import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setAwaitNFTCookie, getAwaitNFTCookie, checkGift } from '../utils/metamask';
import { contractAddress } from '../utils/constants';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CommonButton,
    ContactsBox,
    CommonSpinner,
  },

  setup() {
    const router = useRouter();
    const { locale } = useI18n({ useScope: 'global' });
    const buttonIsShown = ref(true);
    const awaitGift = ref(true);
    const giftN = ref('0');
    let timeoutId = 0;

    const hideButton = () => {
      buttonIsShown.value = false;
    };

    const checkAwait = async () => {
      const awaitStatus = getAwaitNFTCookie();

      if (awaitStatus === '0') {
        awaitGift.value = false;
        return;
      }

      const currentGift = await checkGift();
      if (currentGift === '0') {
        timeoutId = setTimeout(checkAwait, 500);
        return;
      }

      setAwaitNFTCookie(0);
      giftN.value = currentGift;
      awaitGift.value = false;
    };

    onUnmounted(() => {
      window.clearTimeout(timeoutId);
    });

    onMounted(async () => {
      const awaitStatus = getAwaitNFTCookie();

      if (awaitStatus === '1') {
        checkAwait();
        return;
      }

      const currentGift = await checkGift();

      if (!currentGift || currentGift === '0') {
        awaitGift.value = false;
        router.push(`/${locale.value}`);
        return;
      }

      if (currentGift !== '0') {
        awaitGift.value = false;
        giftN.value = currentGift;
      }
    });

    return {
      awaitGift,
      giftN,
      buttonIsShown,
      contractAddress,
      hideButton,
    };
  },
};
</script>

<style lang="stylus">
.yourGift {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-bottom: 16px;
  }

  &__buttonsBox {
    margin-bottom: 88px;
  }
}

.imageBox {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  max-width: $width.phoneXs.buttonText;
  height: 420px;
  background: rgba(3, 1, 6, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.31);
  border-radius: 8px;

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }
}

.image {
  display: block;
  width: 100%;
  max-width: 320px;
}

.buttonsBox {
  display: grid;
  grid-row-gap: 16px;
}

.instructions {
  display: block;
  width: 100%;
  max-width: 320px;
  margin: 0 0 88px 0;
  padding: 0 0 0 20px;
}

.instructionsItem {
  getFontText();
  word-break: break-word;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
}

.loader {
  margin-bottom: 15px;
}
</style>
