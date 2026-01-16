import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useMemo, useState } from 'react'

type Props = {
    slots: string[]
    value: string | null
    onChange: (time: string) => void
}

export function TimeSlotPicker({
                                   slots,
                                   value,
                                   onChange,
                               }: Props) {
    const [showPicker, setShowPicker] = useState(false)
    const [pickerDate, setPickerDate] = useState(new Date())

    /**
     * 🔄 slots → Date[]
     */
    const slotDates = useMemo(() => {
        return slots
            .map((s) => {
                const [h, m] = s.split(':').map(Number)
                const d = new Date()
                d.setHours(h, m, 0, 0)
                return d
            })
            .sort((a, b) => a.getTime() - b.getTime())
    }, [slots])

    /**
     * ⏳ Будущие слоты (от текущего времени)
     */
    const now = new Date()

    const futureSlots = useMemo(() => {
        return slotDates.filter(
            (d) => d.getTime() > now.getTime()
        )
    }, [slotDates])

    /**
     * 🚫 Мойка закрыта
     */
    const isClosed = futureSlots.length === 0

    /**
     * ⭐ Рекомендации (первые 5 будущих)
     */
    const recommended = futureSlots.slice(0, 5)

    /**
     * 🕒 Формат
     */
    const format = (d: Date) =>
        `${d.getHours().toString().padStart(2, '0')}:${d
            .getMinutes()
            .toString()
            .padStart(2, '0')}`

    /**
     * 📤 Picker change
     */
    const onPickerChange = (_: any, selected?: Date) => {
        setShowPicker(false)
        if (!selected) return

        const nearest = futureSlots.reduce((prev, curr) =>
            Math.abs(curr.getTime() - selected.getTime()) <
            Math.abs(prev.getTime() - selected.getTime())
                ? curr
                : prev
        )

        setPickerDate(nearest)
        onChange(format(nearest))
    }

    /**
     * ⭐ Клик по рекомендации
     */
    const selectRecommended = (d: Date) => {
        setPickerDate(d)
        onChange(format(d))
    }

    /**
     * 🚫 CLOSED STATE
     */
    if (isClosed) {
        return (
            <View style={styles.closedBox}>
                <Text style={styles.closedTitle}>
                    Мойка закрыта
                </Text>
                <Text style={styles.closedSubtitle}>
                    На сегодня свободного времени больше нет
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            {/* ⭐ Рекомендованные слоты */}
            {recommended.length > 0 && (
                <View style={styles.recommendBlock}>
                    <Text style={styles.recommendTitle}>
                        Рекомендуемое время
                    </Text>

                    <View style={styles.recommendRow}>
                        {recommended.map((d) => {
                            const time = format(d)
                            const active = time === value

                            return (
                                <Pressable
                                    key={time}
                                    style={[
                                        styles.recommendItem,
                                        active && styles.recommendItemActive,
                                    ]}
                                    onPress={() => selectRecommended(d)}
                                >
                                    <Text
                                        style={[
                                            styles.recommendText,
                                            active && styles.recommendTextActive,
                                        ]}
                                    >
                                        {time}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
            )}

            {/* ⏱ Основной выбор */}
            <Pressable
                style={styles.input}
                onPress={() => setShowPicker(true)}
            >
                <Text style={styles.inputText}>
                    {value ?? 'Выберите время'}
                </Text>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={pickerDate}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minuteInterval={30}
                    onChange={onPickerChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        gap: 12,
    },

    /* ⭐ Recommendations */
    recommendBlock: {
        gap: 8,
    },

    recommendTitle: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },

    recommendRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    recommendItem: {
        height: 36,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    recommendItemActive: {
        backgroundColor: '#111827',
    },

    recommendText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },

    recommendTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },

    /* ⏱ Picker input */
    input: {
        height: 48,
        borderRadius: 14,
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },

    /* 🚫 Closed */
    closedBox: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 14,
        backgroundColor: '#FEE2E2',
        gap: 6,
    },

    closedTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#991B1B',
    },

    closedSubtitle: {
        fontSize: 13,
        color: '#7F1D1D',
    },
})
