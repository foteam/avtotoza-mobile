import { Pressable, Text, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
    visible: boolean
    onPress: () => void
}

export function BookButton({ visible, onPress }: Props) {
    const insets = useSafeAreaInsets()

    if (!visible) return null // 👈 КЛЮЧЕВО

    return (
        <View
            pointerEvents="box-none"
            style={[
                styles.wrapper,
                { paddingBottom: insets.bottom + 12 },
            ]}
        >
            <Pressable
                onPress={onPress}
                style={styles.button}
            >
                <Text style={styles.text}>Забронировать</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,

        paddingHorizontal: 16,
        backgroundColor: 'transparent', // ✅ ПРОЗРАЧНЫЙ
    },
    button: {
        backgroundColor: '#006cff',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',

        // лёгкая тень
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})
