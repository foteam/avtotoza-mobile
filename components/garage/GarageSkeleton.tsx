import { View, Text, StyleSheet } from 'react-native'
import { ShimmerOverlay } from '@/components/ShimmerOverlay'
type Props = {
    count?: number
}
export function GarageSkeleton({count = 3}: Props) {
    return (
        <View style={styles.list}>
            {Array.from({ length: count }).map((_, index) => (
                <View key={index} style={styles.card}>
                    {/* Overlay */}
                    <View style={styles.overlay} >
                        <ShimmerOverlay />
                    </View>

{/*                     ⭐ Primary badge
                    <View style={styles.primaryBadge}>
                        <Text style={styles.primaryText}>
                            ⭐ Asosiy
                        </Text>
                    </View>*/}

                    <View style={styles.content}>
                        {/* TOP */}
                        <View>
                            <Text style={styles.caption}>
                                Mening avtomobilim
                            </Text>
                            <Text style={styles.title}>
                                Chevrolet Cobalt
                            </Text>
                        </View>

                        {/* BOTTOM */}
                        <View style={styles.bottomRow}>
                            <View style={styles.plateWrap}>
                                <Text style={styles.plate}>
                                    01 A 123 BC 🇺🇿
                                </Text>
                            </View>

                            <View style={styles.cleanWrap}>
                                <Text style={styles.cleanText}>
                                    🧼 100%
                                </Text>
                            </View>
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
        paddingBottom: 160, // как в CarList
    },

    card: {
        height: 190,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#a6a6a6',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(156,156,156,0.35)',
    },

    primaryBadge: {
        position: 'absolute',
        top: 14,
        right: 14,
        backgroundColor: 'rgba(0,0,0,0.65)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        zIndex: 2,
    },

    primaryText: {
        color: '#FFD700',
        fontSize: 12,
        fontWeight: '600',
    },

    content: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },

    caption: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 12,
    },

    title: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 2,
    },

    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    plateWrap: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },

    plate: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },

    cleanWrap: {
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },

    cleanText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
})

