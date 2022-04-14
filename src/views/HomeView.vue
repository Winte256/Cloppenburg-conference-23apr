<template>
  <div class="home">
    <div class="titleWrap">
      <the-title class="home__title" :small="true">
        23.04.2022
        <br />
        Deutschland, Cloppenburg
        <template v-slot:yellow>OTON KONFERENZ</template>
      </the-title>
      <the-title class="home__title">
        {{ $t("ЧТО ТАКОЕ BLOCKCHAIN") }}
        <template v-slot:yellow> </template>
      </the-title>
    </div>
    <img
      class="nftTicket"
      :src="require(`@/assets/images/nft-ticket.gif`)"
      alt="nft-ticket"
    />
    <!-- <p
      class="home__text text"
      v-html="$t('Специально к этому празднику мы')"
    ></p>

    <div class="sliderItemsBox">
      <div class="sliderItemsWrap">
        <sliderItems />
      </div>
    </div> -->

    <!-- <p
      class="home__text text"
      v-html="$t('Нажмите на кнопку КУПИТЬ NFT-БИЛЕТ')"
    ></p> -->

    <div class="home__buttonsBox buttonsBox">

      <common-button v-if="!loading && !success" :hasBackground="true" @click="buy">
        {{ $t("КУПИТЬ NFT-БИЛЕТ") }}
      </common-button>
      <CommonSpinner v-if="loading"/>
      <div v-if="!loading && success" :hasBackground="true" style="text-align: center;" className="titleText titleText_yellow titleText_small">
        {{ $t("БИЛЕТ КУПЛЕН") }}
      </div>

    </div>
    <p class="policies policies_price">5 USDT</p>
    <p class="policies policies_privacy">
      <span v-html="$t('Нажимая на кнопку')" />
      <a
        class="policiesLink"
        href="https://oton.org/media/PRIVACY_NOTICE.pdf?b6f7ac2c"
        target="_blank"
        rel="noopener noreferrer"
        v-html="$t('политикой конфиденциальности')"
      />
    </p>
    <p class="policies policies_nft">
      <span> {{ $t("Для получения NFT") }} </span>
      <span class="metamaskText" v-html="$t('Регистрация нового кошелька')" />
    </p>

    <p class="home__text text" v-html="$t('Инструкция подключения сети')" />

    <iframe
      class="iframe"
      src="https://www.youtube.com/embed/t5Ob-PxmCO0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />

    <p class="text addressText">11.00 - 17.00</p>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://goo.gl/maps/KaAMQh69rScghzoz7"
      class="text addressLink"
      >Stadthalle Cloppenburg Mühlenstraße 20-22, 49661 Cloppenburg
    </a>

    <contacts-box />

    <div class="organizator">
      <div class="organizatorInner">
        <p class="organizatorText" v-html="$t('Организатор')" />
        <p class="organizatorText" v-html="$t('Юрий Гришин')" />
      </div>
      <a class="organizatorText" href="tel:+49 1629749353">+49 1629749353</a>
    </div>
  </div>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import CommonButton from '@/components/CommonButton.vue';
// import BaseIconSvg from '@/components/BaseIconSvg.vue';
// import HeartIcon from '@/components/SvgIcons/HeartIcon.vue';
import ContactsBox from '@/components/ContactsBox.vue';
import CommonSpinner from '@/components/CommonSpinner.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
// import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  buyConf,
} from '../utils/metamask';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CommonButton,
    // BaseIconSvg,
    // HeartIcon,
    ContactsBox,
    CommonSpinner,
  },

  setup() {
    const loading = ref(false);
    const success = ref(false);
    const toast = useToast();
    // const router = useRouter();
    const { locale } = useI18n({ useScope: 'global' });

    const buy = async () => {
      if (loading.value) {
        return;
      }

      loading.value = true;

      try {
        await buyConf();
        success.value = true;
      } catch (error) {
        success.value = false;
        console.error(error);
        toast.error('Неизвестная Ошибка при получении NFT');
      }
      loading.value = false;
    };

    return {
      locale,

      loading,
      success,
      buy,
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

  &__policies {
    margin-bottom: 56px;
  }

  &__buttonsBox {
    margin-bottom: 8px;
  }
}

.text {
  display: block;
  getFontText();
  text-align: center;
  color: $colorFiller;
}

.policies {
  text-align: center;
  getFontPolicies();
  color: $colorFiller;

  &_price {
    margin-bottom: 20px;
  }

  &_privacy {
    margin-bottom: 20px;
  }

  &_nft {
    margin-bottom: 56px;
  }
}

.policiesLink {
  padding-left: 5px;
  color: $colorAccent;

  &:hover {
    color: $colorAccent;
  }
}

.metamaskText {
  display: block;
  padding-left: 5px;

  a {
    color: $colorAccent;

    &:hover {
      color: $colorAccent;
    }
  }
}

.buttonsBox {
  display: grid;
  grid-row-gap: 16px;
}

.nftTicket {
  display: block;
  margin-bottom: 40px;
  width: 100%;
}

.organizator {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  width: 100%;
}

.organizatorText {
  margin-bottom: 5px;
  getFontText();
  color: $colorFiller;
}

.iframe {
  display: block;
  margin-bottom: 20px;
  width: 300px;
  height: 168px;

  +mediaPhoneS() {
    width: 345px;
    height: 194px;
  }
}

.addressText {
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
}

.addressLink {
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
  text-decoration: underline;

  &:hover {
    color: $colorFiller;
  }
}
</style>
