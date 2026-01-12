import { createTamagui, createFont, createTokens} from 'tamagui'
import { config } from '@tamagui/config/v3'
const tokens = createTokens({
    size: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
    },
    space: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
    },
    radius: {
        1: 6,
        2: 10,
        3: 14,
    },
    color: {
        background: '#FFFFFF',
        gray3: '#E5E5EA',
        gray4: '#D1D1D6',
        primary: '#4D77FF',
    },
})
const openSans = createFont({
    family: 'OpenSans-Regular',
    size: {
        1: 12,
        2: 14,
        3: 16,
        4: 18,
        5: 20,
        6: 24,
        7: 28,
    },
    lineHeight: {
        1: 16,
        2: 18,
        3: 22,
        4: 26,
        5: 30,
        6: 34,
        7: 38,
    },
    weight: {
        4: '400',
        5: '500',
        6: '600',
        7: '700',
    },
    face: {
        400: { normal: 'OpenSans-Regular' },
        500: { normal: 'OpenSans-Medium' },
        600: { normal: 'OpenSans-SemiBold' },
        700: { normal: 'OpenSans-Bold' },
    },
})

const tamaguiConfig = createTamagui({
    ...config,
    fonts: {
        body: openSans,
        heading: openSans,
    },

})

export default tamaguiConfig

export type AppTamaguiConfig = typeof tamaguiConfig

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppTamaguiConfig {}
}
