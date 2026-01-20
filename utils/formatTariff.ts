import i18n from '@/i18n'
import { parseTariff } from './parseTariff'

export function formatTariffName(raw: string) {
    const { base, plus, category } = parseTariff(raw)

    let name = i18n.t(`booking.tariffs.${base}`)

    if (plus) {
        name += ` ${i18n.t('booking.tariffs.plus')}`
    }

    if (category) {
        name += ` (${i18n.t(`booking.tariffs.${category}`)})`
    }

    return name
}
