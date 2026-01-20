import { View, StyleSheet } from 'react-native'
import { SkeletonBlock } from '@/components/SkeletonBlock'

type Props = {
    count?: number
}

export function GarageSkeleton({ count = 3 }: Props) {
    return (
        <View style={styles.list}>
            {Array.from({ length: count }).map((_, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.content}>
                        {/* TOP */}
                        <View>
                            <SkeletonBlock width={120} height={12} radius={6} />
                            <SkeletonBlock
                                width={180}
                                height={18}
                                radius={8}
                                style={{ marginTop: 8 }}
                            />
                        </View>

                        {/* BOTTOM */}
                        <View style={styles.bottomRow}>
                            <SkeletonBlock width={110} height={28} radius={10} />
                            <SkeletonBlock width={60} height={28} radius={10} />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    list: {
        gap: 16,
        paddingBottom: 160,
    },

    card: {
        height: 190,
        borderRadius: 24,
        backgroundColor: '#d4d4d4',
        overflow: 'hidden',
    },

    content: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
