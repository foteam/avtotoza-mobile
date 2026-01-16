import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

type Props = {
    banner: string
    name: string
    address: string
    rating?: number
    reviewsCount?: number
}

export function BannerHeader({ banner, name, address, rating, reviewsCount}: Props) {
    const router = useRouter()

    return (
        <View style={styles.wrapper}>
            <ImageBackground
                source={{ uri: banner }}
                style={styles.image}
                resizeMode="cover"
            >
                {/* 🔙 BACK BUTTON */}
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={10}
                >
                    <Ionicons name="chevron-back" size={26} color="white" />
                </Pressable>

                {/* GRADIENT + TEXT */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.75)']}
                    style={styles.overlay}
                >
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>
                        ⭐ {rating && rating > 0 ? rating : '—'} · {address}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 280,
        backgroundColor: 'transparent',
    },

    image: {
        flex: 1,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
    },

    /* 🔙 BACK BUTTON */
    backButton: {
        position: 'absolute',
        top: 48, // ⬅️ под SafeArea (iOS)
        left: 16,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },

    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },

    title: {
        color: 'white',
        fontSize: 26,
        fontWeight: '700',
    },

    subtitle: {
        color: '#EEE',
        marginTop: 4,
    },
})
