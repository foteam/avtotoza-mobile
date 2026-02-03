import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

export async function registerForPushNotifications(): Promise<string | null> {
    try {
        if (!Device.isDevice) {
            console.log('❌ Push only on real device')
            return null
        }

        // 1️⃣ permissions
        const permissions =
            await Notifications.getPermissionsAsync()

        let status = permissions.status

        if (status !== 'granted') {
            const request =
                await Notifications.requestPermissionsAsync()
            status = request.status
        }

        if (status !== 'granted') {
            console.log('❌ Permission denied')
            return null
        }

        // 2️⃣ projectId (ОБЯЗАТЕЛЬНО)
        const projectId =
            Constants.expoConfig?.extra?.eas?.projectId ??
            Constants.easConfig?.projectId

        if (!projectId) {
            console.log('❌ projectId missing')
            return null
        }

        console.log('✅ projectId:', projectId)

        // 3️⃣ Android channel ДО токена
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync(
                'default',
                {
                    name: 'default',
                    importance:
                    Notifications.AndroidImportance.MAX,
                }
            )
        }

        // 4️⃣ token С projectId
        const tokenResponse =
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })

        const token = tokenResponse.data

        if (!token) {
            console.log('❌ Token empty')
            return null
        }

        console.log('✅ PUSH TOKEN:', token)
        return token
    } catch (e) {
        console.log('❌ getPushToken error:', e)
        return null
    }
}