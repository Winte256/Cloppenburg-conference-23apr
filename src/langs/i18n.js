import { createI18n } from 'vue-i18n';
import { customPlureRule } from '@/hooks/tc';
import getLang from '@/utils/cookies/getLang';
import allowedLangs from './allowedLangs';
import strings from './strings';

const defaultDatesFormat = {
  loopShortFirst: {
    month: 'short',
    day: 'numeric',
  },
  dexDate: {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  loopShortSecond: {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
  commentDate: {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  },
};

const datetimeFormats = {};

allowedLangs.forEach((l) => {
  datetimeFormats[l] = defaultDatesFormat;
});

const i18n = createI18n({
  datetimeFormats,
  legacy: false,
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  locale: getLang() || 'en', // установка локализации по умолчанию
  fallbackLocale: 'en',
  messages: strings, // установка сообщений локализаций
  pluralRules: {
    ru: customPlureRule,
  },

  // mode: 'composition',
});

export const getLocale = () => {
  const { locale } = i18n.global;

  if (typeof locale === 'object' && locale.value) {
    return locale.value;
  }

  return locale;
};

export default i18n;
