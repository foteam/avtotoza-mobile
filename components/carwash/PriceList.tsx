import { Pressable, Text, StyleSheet, View } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated'

export function PriceList({ prices, selected, onSelect }: any) {
    return (
        <View style={styles.wrap}>
            {prices.map((p: any) => (
                <PriceItem
                    key={p.type}
                    item={p}
                    active={selected?.type === p.type}
                    onPress={() => onSelect(p)}
                />
            ))}
        </View>
    )
}

/* ---------------- PRICE ITEM ---------------- */

function PriceItem({
                       item,
                       active,
                       onPress,
                   }: {
    item: any
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
                    scale.value = withTiming(0.97, { duration: 120 })
                }}
                onPressOut={() => {
                    scale.value = withTiming(1, { duration: 120 })
                }}
                onPress={onPress}
                style={[
                    styles.card,
                    active ? styles.active : styles.inactive,
                ]}
            >
                <View>
                    <Text
                        style={[
                            styles.type,
                            active && styles.textActive,
                        ]}
                    >
                        {item.type}
                    </Text>
                    <Text
                        style={[
                            styles.subtitle,
                            active && styles.textActiveMuted,
                        ]}
                    >
                        Avtomoyka xizmati
                    </Text>
                </View>

                <Text
                    style={[
                        styles.price,
                        active && styles.textActive,
                    ]}
                >
                    {Number(item.price).toLocaleString()} so'm
                </Text>
            </Pressable>
        </Animated.View>
    )
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    wrap: {
        gap: 12,
        marginTop: 8,
    },

    card: {
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inactive: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    active: {
        backgroundColor: '#4D77FF',

        // iOS shadow
        shadowColor: '#4D77FF',
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },

        // Android
        elevation: 6,
    },

    type: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },

    subtitle: {
        fontSize: 12,
        marginTop: 4,
        color: '#6B7280',
    },

    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    textActive: {
        color: '#FFFFFF',
    },

    textActiveMuted: {
        color: 'rgba(255,255,255,0.85)',
    },
})
