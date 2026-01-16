import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
} from 'react-native'

type Props = {
    brand: string
    model: string
    plate?: string
    image?: string | null
    isPrimary?: boolean
    cleanliness?: number
    onPress?: () => void
}

export function CarCard({
                            brand,
                            model,
                            plate,
                            image,
                            isPrimary = false,
                            cleanliness = 100,
                            onPress,
                        }: Props) {
    return (
        <Pressable onPress={onPress} style={styles.wrapper}>
            <ImageBackground
                source={{
                    uri:
                        image ||
                        'https://i.ibb.co/R4cLCjgX/Chevrolet-Equinox-Mk3f-Premier-2020-1000-0005.jpg',
                }}
                style={styles.image}
                imageStyle={styles.imageRadius}
            >
                {/* Overlay */}
                <View style={styles.overlay} />

                {/* ⭐ Primary badge */}
                {isPrimary && (
                    <View style={styles.primaryBadge}>
                        <Text style={styles.primaryText}>⭐ Asosiy</Text>
                    </View>
                )}

                <View style={styles.content}>
                    {/* TOP */}
                    <View>
                        <Text style={styles.caption}>Mening avtomobilim</Text>
                        <Text style={styles.title}>
                            {brand} {model}
                        </Text>
                    </View>

                    {/* BOTTOM */}
                    <View style={styles.bottomRow}>
                        {/* Plate */}
                        <View style={styles.plateWrap}>
                            <Text style={styles.plate}>
                                {plate || '—'} 🇺🇿
                            </Text>
                        </View>

                        {/* Cleanliness */}
                        <View style={styles.cleanWrap}>
                            <Text style={styles.cleanText}>
                                🧼 {cleanliness}%
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 190,
        borderRadius: 24,
        overflow: 'hidden',
    },

    image: {
        flex: 1,
        justifyContent: 'space-between',
    },

    imageRadius: {
        borderRadius: 24,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
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

