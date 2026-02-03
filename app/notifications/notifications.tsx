import { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Pressable,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuthStore } from '@/store/useAuthStore'
import dayjs from 'dayjs'
import i18n from "@/i18n"
import Notifications from 'expo-notifications'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api/user'

export default function NotificationsPage() {
    const { colors } = useTheme()
    const user = useAuthStore((s) => s.user)

    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const settings = await Notifications.getPermissionsAsync()

                if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
                    await Notifications.setBadgeCountAsync(0)
                }
            } catch (e) {
                console.log('badge error', e)
            }
        })()
    }, [])

    const load = async () => {
        if (!user?.user_id) {
            setLoading(false)
            return
        }

        try {
            const res = await fetch(
                `${API_URL}/notifications/${user.user_id}`
            )
            const json = await res.json()
            setItems(Array.isArray(json?.notifications) ? json.notifications : [])
        } catch (e) {
            console.log('notifications error', e)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        load()
    }, [user?.user_id])

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                {i18n.t('profile.notification.title')}
            </Text>

            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            load()
                        }}
                    />
                }
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                contentContainerStyle={{ paddingBottom: 40 }}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        {i18n.t('profile.notification.noNotifications')}
                    </Text>
                }
                renderItem={({ item }) => (
                    <NotificationCard notification={item} />
                )}
            />
        </View>
    )
}
function NotificationCard({ notification }: { notification: any }) {
    const isUnread = !notification.isRead

    return (
        <Pressable style={({ pressed }) => [
            styles.card,
            pressed && { opacity: 0.96, scale: 0.98 },
        ]}>
            {/* UNREAD DOT */}
            {isUnread && <View style={styles.unreadDot} />}

            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="bell-outline"
                    size={18}
                    color="#2563EB"
                />
                <Text style={styles.titleText} numberOfLines={1}>
                    {notification.title ?? 'Notification'}
                </Text>
            </View>

            <Text style={styles.desc} numberOfLines={3}>
                {notification.body}
            </Text>

            <View style={styles.footer}>
                <MaterialCommunityIcons
                    name="clock-outline"
                    size={14}
                    color="#9CA3AF"
                />
                <Text style={styles.date}>
                    {dayjs(notification.createdAt).format('DD.MM.YYYY HH:mm')}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        marginTop: 40,
        marginBottom: 20,
        letterSpacing: -0.5,
    },

    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        padding: 16,
        position: 'relative',
    },

    unreadDot: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2563EB',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },

    titleText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        flexShrink: 1,
    },

    desc: {
        fontSize: 14,
        color: '#374151',
        marginTop: 4,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 12,
    },

    date: {
        fontSize: 12,
        color: '#9CA3AF',
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    empty: {
        textAlign: 'center',
        opacity: 0.5,
        marginTop: 40,
        fontSize: 15,
    },
})

