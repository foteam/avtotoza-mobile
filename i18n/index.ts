import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import {useAuthStore} from "@/store/useAuthStore";

import ru from './locales/ru'
import en from './locales/en'
import uzCyrl from './locales/uzCyrl'
import uzLatn from './locales/uzLatn'

const resources = {
    ru: { translation: ru },
    en: { translation: en },
    'uz-Cyrl': { translation: uzCyrl },
    'uz-Latn': { translation: uzLatn },
}

const locales = Localization.getLocales()
const deviceLanguage = locales[0]?.languageTag

const detectLanguage = () => {
    if (deviceLanguage.startsWith('ru')) return 'ru'
    if (deviceLanguage.startsWith('uz')) return 'uz-Latn'
    if (deviceLanguage.startsWith('en')) return 'en'
    return 'ru'
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: useAuthStore.getState().lang,
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
