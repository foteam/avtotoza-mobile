import * as Device from 'expo-device'
import { Platform } from 'react-native'
import Constants from 'expo-constants'

const pushDisabled =
    Constants.appOwnership === 'expo' ||
    Constants.appOwnership === 'guest' ||
    Constants.appOwnership === 'storeClient'

// ⬇️ ВАЖНО: БЕЗ import
let Notifications: any = null

if (!pushDisabled) {
    Notifications = require('expo-notifications')
}

export async function registerForPushNotifications() {
    // ❌ Expo Go / эмулятор — сразу выходим
    if (pushDisabled) {
        console.log('[push disabled] Expo Go / emulator')
        return null
    }

    // ❌ не физическое устройство
    if (!Device.isDevice) {
        console.log('[push disabled] not a real device')
        return null
    }

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync()

    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
        const { status } =
            await Notifications.requestPermissionsAsync()
        finalStatus = status
    }

    if (finalStatus !== 'granted') {
        console.log('❌ Нет разрешения на уведомления')
        return null
    }

    const token = (
        await Notifications.getExpoPushTokenAsync()
    ).data

    // Android channel
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        })
    }

    console.log('✅ EXPO PUSH TOKEN:', token)

    return token
}
