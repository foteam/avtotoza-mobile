import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
import { PremiumTheme } from './theme/premiumTheme'

import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
// @ts-ignore
import AnimatedSplash from 'react-native-animated-splash-screen'

import i18n from '@/i18n'
import { useAuthStore } from '@/store/useAuthStore'
import { initAnalytics } from '@/lib/analytics'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 60,
        },
    },
})

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false)

    const [fontsLoaded] = useFonts({
        'OpenSans-Regular': require('@/assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Medium': require('@/assets/fonts/OpenSans-Medium.ttf'),
        'OpenSans-SemiBold': require('@/assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans-Bold': require('@/assets/fonts/OpenSans-Bold.ttf'),
    })

    useEffect(() => {
        if (fontsLoaded) {
            i18n.changeLanguage(useAuthStore.getState().lang)
            initAnalytics()

            // ❗️Скрываем native splash
            SplashScreen.hideAsync()

            // небольшая пауза для анимации
            setTimeout(() => {
                setAppReady(true)
            }, 600)
        }
    }, [fontsLoaded])

    return (
        <AnimatedSplash
            isLoaded={appReady}
            logoImage={require('@/assets/logo/avtotoza_blue_logo.png')}
            backgroundColor="#FFF"
            logoHeight={220}
            logoWidth={220}
        >
            <TamaguiProvider config={tamaguiConfig}>
                <QueryClientProvider client={queryClient}>
                    <PaperProvider theme={PremiumTheme}>
                        <Stack screenOptions={{ headerShown: false }} />
                    </PaperProvider>
                </QueryClientProvider>
            </TamaguiProvider>
        </AnimatedSplash>
    )
}
