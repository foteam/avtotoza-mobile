import { View, StyleSheet, Animated } from 'react-native'
import { useEffect, useRef } from 'react'

function SkeletonBlock({ style }: { style?: any }) {
    const opacity = useRef(new Animated.Value(0.3)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }, [])

    return (
        <Animated.View
            style={[
                styles.block,
                style,
                { opacity },
            ]}
        />
    )
}

export function CarwashSkeleton() {
    return (
        <View style={styles.screen}>
            {/* 🔵 Banner */}
            <SkeletonBlock style={styles.banner} />

            {/* ⚪ Content */}
            <View style={styles.content}>
                <SkeletonBlock style={styles.input} />

                {/* Prices */}
                <SkeletonBlock style={styles.card} />
                <SkeletonBlock style={styles.card} />
                <SkeletonBlock style={styles.card} />

                {/* Slots */}
                <View style={styles.row}>
                    <SkeletonBlock style={styles.slot} />
                    <SkeletonBlock style={styles.slot} />
                    <SkeletonBlock style={styles.slot} />
                    <SkeletonBlock style={styles.slot} />
                </View>

                {/* Gallery */}
                <SkeletonBlock style={styles.gallery} />

                {/* Map */}
                <SkeletonBlock style={styles.map} />

                {/* Button */}
                <SkeletonBlock style={styles.button} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#4D77FF',
    },

    block: {
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
    },

    banner: {
        height: 280,
    },

    content: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        padding: 16,
    },

    input: {
        height: 48,
        marginBottom: 20,
    },

    card: {
        height: 64,
        marginBottom: 12,
        borderRadius: 18,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginVertical: 16,
    },

    slot: {
        width: 80,
        height: 36,
        borderRadius: 14,
    },

    gallery: {
        height: 140,
        borderRadius: 16,
        marginBottom: 20,
    },

    map: {
        height: 200,
        borderRadius: 20,
        marginBottom: 24,
    },

    button: {
        height: 52,
        borderRadius: 16,
    },
})
