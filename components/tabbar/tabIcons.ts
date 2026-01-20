import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

type TabConfig = {
    icon: string
    label: string
}

type TabsConfig = Record<string, TabConfig>
export function useTabIcons(): TabsConfig {
    const { t } = useTranslation()

    return {
        index: {
            icon: 'home-variant',
            label: t('navbar.home'),
        },
        garage: {
            icon: 'car',
            label: t('navbar.garage'),
        },
        orders: {
            icon: 'clipboard-text',
            label: 'Заказы',
        },
        profile: {
            icon: 'account',
            label: t('navbar.profile'),
        },
    }
}
export const TAB_CONFIG: Record<
    string,
    { icon: string; label: string }
> = {
    index: {
        icon: 'home-variant',
        label: i18n.t('navbar.home'),
    },
    garage: {
        icon: '(car)',
        label: i18n.t('navbar.garage'),
    },
    orders: {
        icon: 'clipboard-text',
        label: 'Заказы',
    },
    profile: {
        icon: 'account',
        label: i18n.t('navbar.profile'),
    },
}
