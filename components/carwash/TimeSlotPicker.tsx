import { useMemo, useState } from 'react'
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native'

type Props = {
    slots: string[] // ['09:00', '10:00', ...]
    value?: string
    onChange: (value: string) => void
}

export function TimeSlotPicker({
                                   slots,
                                   value,
                                   onChange,
                               }: Props) {
    const [dayOffset, setDayOffset] = useState<0 | 1 | 2>(0)

    /* ===== helpers ===== */

    const labelForDay = (offset: number) => {
        if (offset === 0) return 'Сегодня'
        if (offset === 1) return 'Завтра'
        return 'Послезавтра'
    }

    const formatDay = (d: Date) =>
        `${d.getDate().toString().padStart(2, '0')}.${(
            d.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}`

    /* ===== base date ===== */

    const baseDate = useMemo(() => {
        const d = new Date()
        d.setDate(d.getDate() + dayOffset)
        d.setHours(0, 0, 0, 0)
        return d
    }, [dayOffset])

    /* ===== slot dates ===== */

    const slotDates = useMemo(() => {
        return slots
            .map((s) => {
                const [h, m] = s
                    .split(':')
                    .map(Number)
                const d = new Date(baseDate)
                d.setHours(h, m, 0, 0)
                return d
            })
            .sort(
                (a, b) => a.getTime() - b.getTime()
            )
    }, [slots, baseDate])

    /* ===== filter future for today ===== */

    const now = new Date()

    const availableSlots = useMemo(() => {
        if (dayOffset !== 0) return slotDates

        return slotDates.filter(
            (d) => d.getTime() > now.getTime()
        )
    }, [slotDates, dayOffset])

    /* ===== render ===== */

    return (
        <View style={styles.container}>
            {/* 📅 DAY SELECTOR */}
            <View style={styles.dayRow}>
                {[0, 1, 2].map((offset) => {
                    const d = new Date()
                    d.setDate(d.getDate() + offset)

                    const active =
                        offset === dayOffset

                    return (
                        <Pressable
                            key={offset}
                            onPress={() => {
                                setDayOffset(
                                    offset as 0 | 1 | 2
                                )
                                onChange('') // reset time
                            }}
                            style={[
                                styles.dayItem,
                                active &&
                                styles.dayItemActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayTitle,
                                    active &&
                                    styles.dayTitleActive,
                                ]}
                            >
                                {labelForDay(offset)}
                            </Text>
                            <Text
                                style={[
                                    styles.dayDate,
                                    active &&
                                    styles.dayDateActive,
                                ]}
                            >
                                {formatDay(d)}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>

            {/* ⏰ TIME SLOTS */}
            <View style={styles.slotGrid}>
                {availableSlots.length === 0 && (
                    <Text style={styles.empty}>
                        Нет доступного времени
                    </Text>
                )}

                {availableSlots.map((d) => {
                    const label = d
                        .toTimeString()
                        .slice(0, 5)
                    const active =
                        value === label

                    return (
                        <Pressable
                            key={label}
                            onPress={() =>
                                onChange(label)
                            }
                            style={[
                                styles.slot,
                                active &&
                                styles.slotActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.slotText,
                                    active &&
                                    styles.slotTextActive,
                                ]}
                            >
                                {label}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },

    /* 📅 DAY */
    dayRow: {
        flexDirection: 'row',
        gap: 8,
    },

    dayItem: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: 'white',
        borderColor: '#dbdbdb',
        borderWidth: 1,
        alignItems: 'center',
    },

    dayItemActive: {
        backgroundColor: '#006cff',
    },

    dayTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
    },

    dayTitleActive: {
        color: '#FFFFFF',
    },

    dayDate: {
        fontSize: 12,
        color: '#6B7280',
    },

    dayDateActive: {
        color: '#E5E7EB',
    },

    /* ⏰ SLOTS */
    slotGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: 10,
    },

    slot: {
        width: '30%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: 'white',
        borderColor: '#dbdbdb',
        borderWidth: 1,
    },

    slotActive: {
        backgroundColor: '#006cff',
    },

    slotText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },

    slotTextActive: {
        color: '#FFFFFF',
    },

    empty: {
        fontSize: 13,
        color: '#9CA3AF',
    },
})
