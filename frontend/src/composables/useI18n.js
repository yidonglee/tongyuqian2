import { computed } from 'vue'
import i18n, { state as i18nState } from '../i18n.js'

export function useI18n() {
  const currentLang = computed(() => i18n.getCurrentLanguage())
  const availableLangs = computed(() => i18n.getAvailableLanguages())
  const currentLangCode = computed(() => i18nState.currentLang)

  const t = (key) => {
    return i18n.t(key)
  }

  const setLanguage = (langCode) => {
    return i18n.setLanguage(langCode)
  }

  return {
    currentLang,
    availableLangs,
    currentLangCode,
    t,
    setLanguage
  }
}

export default useI18n
