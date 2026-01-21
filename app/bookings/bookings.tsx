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
import { router } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'
import { BookingInfoModal } from '@/components/carwash/BookingInfoModal'
import {useCarwash} from "@/hooks/useCarwashes";

const API_URL = 'https://114-29-236-86.cloud-xip.com/api/user'

export default function BookingsPage() {
    const { colors } = useTheme()
    const user = useAuthStore((s) => s.user)

    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selected, setSelected] = useState<any | null>(null)

    const load = async () => {
        if (!user?.user_id) {
            setLoading(false)
            return
        }

        try {
            const res = await fetch(
                `${API_URL}/bookings/get/${user.user_id}`
            )
            const json = await res.json()
            setBookings(Array.isArray(json?.bookings) ? json.bookings : [])
        } catch (e) {
            console.log('bookings error', e)
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

    return <>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                История броней
            </Text>

            <FlatList
                data={bookings}
                keyExtractor={(item, i) => item._id ?? i.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            load()
                        }}
                    />
                }
                contentContainerStyle={{ paddingBottom: 40 }}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        У вас пока нет броней
                    </Text>
                }
                renderItem={({ item }) => (
                    <BookingCard
                        booking={item}
                        onPress={() => setSelected(item)}
                    />
                )}
            />
        </View>
        {/* 📄 Modal */}
        <BookingInfoModal
            open={!!selected}
            booking={selected}
            onClose={() => setSelected(null)}
            onSuccessComplete={load}
            mode="cash"
            paymentLink=""
        />
    </>
}
function BookingCard({
                         booking,
                         onPress,
                     }: {
    booking: any
    onPress: () => void
}) {
    const statusMap: any = {
        completed: { label: 'Завершена', bg: '#DCFCE7', color: '#166534' },
        cancelled: { label: 'Отменена', bg: '#FEE2E2', color: '#991B1B' },
        pending: { label: 'В ожидании', bg: '#FEF9C3', color: '#854D0E' },
        paid: { label: 'Оплачена', bg: '#DBEAFE', color: '#1E40AF' },
    }

    const status = statusMap[booking.status]

    const { data: wash, isLoading } = useCarwash(booking.wash._id)
    console.log(wash?.name)

    return (
        <Pressable onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <Text style={styles.washName}>
                        {wash?.name ?? 'Автомойка'}
                    </Text>

                    {status && (
                        <View
                            style={[
                                styles.statusBadge,
                                { backgroundColor: status.bg },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: status.color },
                                ]}
                            >
                                {status.label}
                            </Text>
                        </View>
                    )}
                </View>

                <Text style={styles.subText}>
                    🚗 {booking.carNumber ?? booking.car}
                </Text>

                <Text style={styles.subText}>
                    📅 {booking.slot}
                </Text>

                {booking.priceType && (
                    <View style={styles.rowBetween}>
                        <Text style={styles.priceLabel}>Стоимость</Text>
                        <Text style={styles.price}>
                            {Number(
                                booking.priceType.split(' – ')[1]
                            ).toLocaleString()} сум
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        marginTop: 50,
        marginBottom: 20,
    },

    empty: {
        textAlign: 'center',
        opacity: 0.6,
        marginTop: 40,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    washName: {
        fontSize: 16,
        fontWeight: '600',
    },

    subText: {
        marginTop: 6,
        opacity: 0.7,
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },

    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },

    priceLabel: {
        marginTop: 10,
        opacity: 0.6,
    },

    price: {
        marginTop: 10,
        fontWeight: '700',
    },
})
