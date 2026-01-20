// components/SkeletonBlock.tsx
import { View, StyleSheet } from 'react-native'
import { ShimmerOverlay } from '@/components/ShimmerOverlay'

export function SkeletonBlock({
                                  width,
                                  height,
                                  radius = 8,
                                  style,
                              }: {
    width: number | string
    height: number
    radius?: number
    style?: any
}) {
    return (
        <View
            style={[
                styles.wrapper,
                { width, height, borderRadius: radius },
                style,
            ]}
        >
            <ShimmerOverlay />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#cfcfcf',
        overflow: 'hidden',
    },
})
