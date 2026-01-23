import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TamaguiProvider } from 'tamagui'
import {Platform} from "react-native";
import tamaguiConfig from '../tamagui.config'
import { PremiumTheme } from './theme/premiumTheme'

import {useFonts} from 'expo-font'
import i18n from '@/i18n'
import {useEffect} from "react";
import {useAuthStore} from "@/store/useAuthStore";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 60,
        },
    },
})

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'OpenSans-Regular': require('@/assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Medium': require('@/assets/fonts/OpenSans-Medium.ttf'),
        'OpenSans-SemiBold': require('@/assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans-Bold': require('@/assets/fonts/OpenSans-Bold.ttf'),
    })
    useEffect(() => {
        i18n.changeLanguage(useAuthStore.getState().lang)
    }, [])
    if (!fontsLoaded) {
        // ❗ ВАЖНО: пока шрифты не загрузились — ничего не рендерим
        return null
    }
    return (
        <TamaguiProvider config={tamaguiConfig}>
            <QueryClientProvider client={queryClient}>
                <PaperProvider theme={PremiumTheme}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    />
                </PaperProvider>
            </QueryClientProvider>
        </TamaguiProvider>
    )
}
