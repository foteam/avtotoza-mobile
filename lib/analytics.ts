import Constants from 'expo-constants'
import { Platform } from 'react-native'

const analyticsDisabled =
    Platform.OS === 'web' ||
    Constants.appOwnership === 'expo' ||
    Constants.appOwnership === 'guest' ||
    Constants.appOwnership === 'storeClient'


// ⬇️ ВАЖНО: БЕЗ import
let analytics: any = null

if (!analyticsDisabled) {
    // require выполнится ТОЛЬКО в реальном билде
    analytics = require('@react-native-firebase/analytics').default
}

// 🔹 Инициализация (вызывать 1 раз при старте приложения)
export async function initAnalytics() {
    try {
        if (analyticsDisabled) return
        await analytics().setAnalyticsCollectionEnabled(true)
        console.log('[analytics] initialized')
    } catch (e) {
        console.log('[analytics] init error', e)
    }
}

// 🔹 Лог события
export async function logEvent(
    name: string,
    params?: Record<string, any>
) {
    try {
        if (analyticsDisabled) return
        await analytics().logEvent(name, params)
    } catch (e) {
        console.log('[analytics] logEvent error', e)
    }
}

// 🔹 Лог экрана (вместо screen_view из expo)
export async function logScreen(screenName: string) {
    try {
        if (analyticsDisabled) return
        await analytics().logScreenView({
            screen_name: screenName,
            screen_class: screenName,
        })
    } catch (e) {
        console.log('[analytics] logScreen error', e)
    }
}

// 🔹 User ID
export async function setUserId(userId?: string) {
    try {
        if (analyticsDisabled) return
        if (userId) {
            await analytics().setUserId(userId)
        }
    } catch (e) {
        console.log('[analytics] setUserId error', e)
    }
}

// 🔹 User properties
export async function setUserProperties(
    props: Record<string, string>
) {
    try {
        if (analyticsDisabled) return
        await analytics().setUserProperties(props)
    } catch (e) {
        console.log('[analytics] setUserProperties error', e)
    }
}
