import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRef } from 'react'

const ITEM_HEIGHT = 44
const VISIBLE_ITEMS = 5
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2)

export function TimeSlotPicker({
                                   slots,
                                   value,
                                   onChange,
                               }: {
    slots: string[]
    value: string | null
    onChange: (time: string) => void
}) {
    const scrollRef = useRef<ScrollView>(null)

    return (
        <View style={styles.container}>
            {/* Fade overlays */}
            <View pointerEvents="none" style={styles.fadeTop} />
            <View pointerEvents="none" style={styles.fadeBottom} />

            {/* Center highlight */}
            <View style={styles.centerHighlight} />

            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                contentContainerStyle={{
                    paddingVertical: CENTER_INDEX * ITEM_HEIGHT,
                }}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.y / ITEM_HEIGHT
                    )
                    const time = slots[index]
                    if (time) onChange(time)
                }}
            >
                {slots.map((time, index) => {
                    const isActive = time === value

                    return (
                        <View key={time} style={styles.item}>
                            <Text
                                style={[
                                    styles.text,
                                    isActive && styles.textActive,
                                ]}
                            >
                                {time}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        width: '100%',
        overflow: 'hidden',
    },

    item: {
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 14,
        color: '#9CA3AF',
        opacity: 0.6,
    },

    textActive: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        opacity: 1,
    },

    centerHighlight: {
        position: 'absolute',
        top: ITEM_HEIGHT * CENTER_INDEX,
        height: ITEM_HEIGHT,
        left: 0,
        right: 0,
        borderRadius: 12,
        backgroundColor: 'rgba(77,119,255,0.08)',
    },

    fadeTop: {
        position: 'absolute',
        top: 0,
        height: ITEM_HEIGHT * 2,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        opacity: 0.8,
    },

    fadeBottom: {
        position: 'absolute',
        bottom: 0,
        height: ITEM_HEIGHT * 2,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        opacity: 0.8,
    },
})
