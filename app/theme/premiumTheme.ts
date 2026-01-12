import { MD3LightTheme } from 'react-native-paper'
import { colors } from './colors'

export const PremiumTheme = {
    ...MD3LightTheme,

    roundness: 14, // Telegram любит умеренные радиусы

    colors: {
        ...MD3LightTheme.colors,

        // Primary
        primary: colors.tgBlue,
        secondary: colors.tgBlueDark,

        // Backgrounds
        background: colors.tgBackground,
        surface: colors.tgBackground,

        // Text
        onPrimary: '#FFFFFF',
        onSurface: colors.textPrimary,

        // Borders
        outline: colors.border,

        // Elevation (минимальная, почти плоско)
        elevation: {
            level0: 'transparent',
            level1: colors.tgBackground,
            level2: colors.tgSecondaryBg,
            level3: colors.tgSecondaryBg,
            level4: colors.border,
            level5: colors.border,
        },
    },
}
