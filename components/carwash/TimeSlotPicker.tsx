import { useMemo, useState } from 'react'
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native'

export type SelectedTimeSlot = {
    day: 'today' | 'tomorrow' | 'after_tomorrow'
    dayLabel: string
    date: string
    time: string
    dateTime: Date
}

type Props = {
    slots: string[]
    value?: SelectedTimeSlot
    onChange: (value: SelectedTimeSlot | null) => void
}

export function TimeSlotPicker({
                                   slots,
                                   value,
                                   onChange,
                               }: Props) {
    const [dayOffset, setDayOffset] =
        useState<0 | 1 | 2>(0)

    const labelForDay = (offset: number) => {
        if (offset === 0) return 'Сегодня'
        if (offset === 1) return 'Завтра'
        return 'Послезавтра'
    }

    const dayKeyForOffset = (
        offset: number
    ): SelectedTimeSlot['day'] => {
        if (offset === 0) return 'today'
        if (offset === 1) return 'tomorrow'
        return 'after_tomorrow'
    }

    const formatDay = (d: Date) =>
        `${d.getDate().toString().padStart(2, '0')}.${(
            d.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}`

    const baseDate = useMemo(() => {
        const d = new Date()
        d.setDate(d.getDate() + dayOffset)
        d.setHours(0, 0, 0, 0)
        return d
    }, [dayOffset])

    const slotDates = useMemo(() => {
        return slots.map((s) => {
            const [h, m] = s.split(':').map(Number)
            const d = new Date(baseDate)
            d.setHours(h, m, 0, 0)
            return d
        })
    }, [slots, baseDate])

    const now = new Date()

    const availableSlots = useMemo(() => {
        if (dayOffset !== 0) return slotDates
        return slotDates.filter(
            (d) => d.getTime() > now.getTime()
        )
    }, [slotDates, dayOffset])

    return (
        <View style={styles.container}>
            {/* DAY */}
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
                                onChange(null)
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

            {/* TIME */}
            <View style={styles.slotGrid}>
                {availableSlots.map((d) => {
                    const time = d
                        .toTimeString()
                        .slice(0, 5)

                    const active =
                        value?.time === time &&
                        value?.day ===
                        dayKeyForOffset(dayOffset)

                    return (
                        <Pressable
                            key={time}
                            onPress={() => {
                                onChange({
                                    day: dayKeyForOffset(
                                        dayOffset
                                    ),
                                    dayLabel:
                                        labelForDay(
                                            dayOffset
                                        ),
                                    date: d
                                        .toISOString()
                                        .slice(0, 10),
                                    time,
                                    dateTime: d,
                                })
                            }}
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
                                {time}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    dayRow: { flexDirection: 'row', gap: 8 },
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
    dayTitleActive: { color: '#fff' },
    dayDate: { fontSize: 12, color: '#6B7280' },
    dayDateActive: { color: '#E5E7EB' },

    slotGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    slot: {
        width: '30%',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: 'white',
        borderColor: '#dbdbdb',
        borderWidth: 1,
        marginBottom: 10,
    },
    slotActive: { backgroundColor: '#006cff' },
    slotText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
    slotTextActive: { color: '#fff' },
})
