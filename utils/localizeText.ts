import i18n from '@/i18n'
import { latinToCyrillic } from './latinToCyrillic'
import { isLatin } from './shouldTransliterate'

export function localizeText(text: string) {
    const lang = i18n.language

    if (
        (lang === 'ru' || lang === 'uz-Cyrl')
    ) {
        return latinToCyrillic(text)
    }

    return text
}
