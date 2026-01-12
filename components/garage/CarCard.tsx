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
    plate: string
    image?: string
    onPress?: () => void
}

function formatPlate(plate = '') {
    if (plate.length === 8) {
        return `${plate.slice(0, 2)} ${plate.slice(2, 3)} ${plate.slice(
            3,
            6
        )} ${plate.slice(6)}`
    }
    if (plate.length === 7) {
        return `${plate.slice(0, 2)} ${plate.slice(2, 5)} ${plate.slice(5)}`
    }
    return plate
}

export function CarCard({
                            brand,
                            model,
                            plate,
                            image,
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

                <View style={styles.content}>
                    {/* TOP */}
                    <View>
                        <Text style={styles.caption}>Mening avtomobilim</Text>
                        <Text style={styles.title}>
                            {brand} {model}
                        </Text>
                    </View>

                    {/* BOTTOM */}
                    <View style={styles.plateWrap}>
                        <Text style={styles.plate}>
                            {formatPlate(plate)} 🇺🇿
                        </Text>
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
    plateWrap: {
        alignSelf: 'flex-start',
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
})
