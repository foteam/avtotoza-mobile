import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

export async function registerForPushNotifications() {
    if (!Device.isDevice) {
        console.log('❌ Push работает только на реальном устройстве')
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
