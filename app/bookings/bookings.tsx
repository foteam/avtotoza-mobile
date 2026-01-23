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
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {useTranslation} from "react-i18next";

const API_URL = 'https://114-29-236-86.cloud-xip.com/api/user'

export default function BookingsPage() {
    const { colors } = useTheme()
    const user = useAuthStore((s) => s.user)

    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selected, setSelected] = useState<any | null>(null)
    const [paymentMode, setPaymentMode] =
        useState<'cash' | 'card'>('cash')

    const {t} = useTranslation()

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
            setBookings(Array.isArray(json?.bookings) ? json.bookings.reverse() : [])
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
                {t('history.title')}
            </Text>

            <FlatList
                data={bookings}
                keyExtractor={(item, i) => item._id ?? i.toString()}
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
                        onPress={() => {
                            if (item.paymentLink && item.status === "created"){
                                setPaymentMode("card")
                            } else {
                                setPaymentMode("cash")
                            }
                            setSelected(item)
                        }}
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
            mode={paymentMode}
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
    const {t} = useTranslation()
    const statusMap: any = {
        completed: {
            label: t('booking.bookingModal.status.completed'),
            icon: 'check-circle',
            color: '#16A34A',
            bg: '#DCFCE7',
        },
        canceled: {
            label: t('booking.bookingModal.status.canceled'),
            icon: 'close-circle',
            color: '#DC2626',
            bg: '#FEE2E2',
        },
        pending: {
            label: t('booking.bookingModal.status.pending'),
            icon: 'clock-outline',
            color: '#CA8A04',
            bg: '#FEF9C3',
        },
        created: {
            label: t('booking.bookingModal.status.created'),
            icon: 'clock-outline',
            color: '#CA8A04',
            bg: '#FEF9C3',
        },
        paid: {
            label: t('booking.bookingModal.status.paid'),
            icon: 'credit-card-check',
            color: '#2563EB',
            bg: '#DBEAFE',
        },
    }

    const status = statusMap[booking.status]

    type DayKey = 'today' | 'tomorrow' | 'after_tomorrow'
    const LABELS_DATE : Record<DayKey, string> = {
        "today":  t('booking.today') as string,
        "tomorrow": t('booking.tomorrow') as string,
        "after_tomorrow": t('booking.afterTomorrow') as string,
    }

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.card,
            pressed && { opacity: 0.96, scale: 0.98 },
        ]}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.row}>
                    <MaterialCommunityIcons
                        name="car-wash"
                        size={18}
                        color="#4rB5563"
                    />
                    <Text style={styles.washName} numberOfLines={1}>
                        {booking.wash?.name ?? 'Автомойка'}
                    </Text>
                </View>

                {status && (
                    <View style={[styles.status, { backgroundColor: status.bg }]}>
                        <MaterialCommunityIcons
                            name={status.icon}
                            size={14}
                            color={status.color}
                        />
                        <Text style={[styles.statusText, { color: status.color }]}>
                            {status.label}
                        </Text>
                    </View>
                )}
            </View>

            {/* INFO */}
            <View style={styles.infoRow}>
                <MaterialCommunityIcons
                    name="calendar-clock"
                    size={16}
                    color="#6B7280"
                />
                <Text style={styles.infoText}>{`${booking.status === "completed" ? t('booking.bookingModal.status.completed'): LABELS_DATE[booking.slot.split(' - ')[0] as DayKey] || t('booking.today') } · ${booking.slot.split(' - ')[1] || booking.slot}`}</Text>
            </View>

            <View style={styles.infoRow}>
                <MaterialCommunityIcons
                    name="car-outline"
                    size={16}
                    color="#6B7280"
                />
                <Text style={styles.infoText}>
                    {booking.carNumber ?? booking.car}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <MaterialCommunityIcons
                    name="credit-card-outline"
                    size={16}
                    color="#6B7280"
                />
                <Text style={styles.infoText}>
                    -
                </Text>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.price}>
                    {Number(
                        booking.priceType?.split(' – ')[1] ?? 0
                    ).toLocaleString()}{t('common.uzs')}
                </Text>

                <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color="#9CA3AF"
                />
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        padding: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flex: 1,
    },

    washName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        flexShrink: 1,
    },

    status: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },

    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
    },

    infoText: {
        fontSize: 14,
        color: '#374151',
    },

    footer: {
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eaeaea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    price: {
        fontSize: 17,
        fontWeight: '800',
        color: '#111827',
    },
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
