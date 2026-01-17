import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {XStack} from "tamagui";

type Props = {
    banner: string
    name: string
    address: string
    rating?: number
    isPremium?: boolean
    reviewsCount?: number
}

export function BannerHeader({ banner, name, address, rating, reviewsCount, isPremium}: Props) {
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
                    {/* 👑 PREMIUM BADGE */}
                    {isPremium && (
                        <LinearGradient
                            colors={['#FFD76A', '#E5B100']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.premiumBadge}
                        >
                            <XStack alignItems="center" gap={4}>
                                <MaterialCommunityIcons
                                    name="crown"
                                    size={12}
                                    color="#4A3A00"
                                />
                                <Text style={styles.premiumText}>
                                    Премиум
                                </Text>
                            </XStack>
                        </LinearGradient>
                    )}

                    {/* 🏷 TITLE */}
                    <Text style={styles.title}>{name}</Text>

                    {/* 📍 SUBTITLE */}
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
    premiumBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        marginBottom: 6, // 👈 расстояние до названия
    },

    premiumText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4A3A00',
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
