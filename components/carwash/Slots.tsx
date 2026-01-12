import { View, Pressable, Text, StyleSheet } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated'

export function Slots({
                          slots,
                          selected,
                          onSelect,
                      }: {
    slots: string[]
    selected: string | null
    onSelect: (s: string) => void
}) {
    return (
        <View style={styles.wrap}>
            {slots.map((time) => (
                <SlotItem
                    key={time}
                    time={time}
                    active={selected === time}
                    onPress={() => onSelect(time)}
                />
            ))}
        </View>
    )
}

/* ---------------- SLOT ITEM ---------------- */

function SlotItem({
                      time,
                      active,
                      onPress,
                  }: {
    time: string
    active: boolean
    onPress: () => void
}) {
    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                onPressIn={() => {
                    scale.value = withTiming(0.96, { duration: 100 })
                }}
                onPressOut={() => {
                    scale.value = withTiming(1, { duration: 120 })
                }}
                onPress={onPress}
                style={[
                    styles.slot,
                    active ? styles.active : styles.inactive,
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        active && styles.textActive,
                    ]}
                >
                    {time}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    slot: {
        height: 40,
        minWidth: 78,
        paddingHorizontal: 18,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    inactive: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    active: {
        backgroundColor: '#4D77FF',
    },

    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
    },

    textActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
})
