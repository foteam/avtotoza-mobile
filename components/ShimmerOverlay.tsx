import { Animated, StyleSheet } from 'react-native'
import { useEffect, useRef } from 'react'

type Props = {
    style?: any
    minOpacity?: number
    maxOpacity?: number
    duration?: number
}

export function ShimmerOverlay({
                                   style,
                                   minOpacity = 0.3,
                                   maxOpacity = 1,
                                   duration = 800,
                               }: Props) {
    const opacity = useRef(
        new Animated.Value(minOpacity)
    ).current

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: maxOpacity,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: minOpacity,
                    duration,
                    useNativeDriver: true,
                }),
            ])
        )

        animation.start()
        return () => animation.stop()
    }, [])

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                styles.overlay,
                style,
                { opacity },
            ]}
        />
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E5E7EB',
    },
})
