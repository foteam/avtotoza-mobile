import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated'

import { CarList } from '../../components/garage/CarList'
import { GarageSkeleton } from '../../components/garage/GarageSkeleton'
import { useGarageCars } from '../../hooks/useGarageCars'
import {useAuthStore} from "@/store/useAuthStore";
import {useEffect} from "react";

export default function GaragePage() {
    const { colors } = useTheme()
    const { cars, loading, error } = useGarageCars()

    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    const user = useAuthStore(state => state.user)
    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/login')
        }
    }, [user])

    // ⛔ Пока редиректим — ничего не рендерим
    if (!user) return null

    if (loading) {
        return <GarageSkeleton />
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                Гараж
            </Text>
            {/* 🫥 Empty state */}
            {cars.length === 0 && !loading && (
                <Text style={styles.emptyText}>
                    У вас пока нет автомобилей
                </Text>
            )}

            {/* 🚘 Cars list */}
            <CarList
                data={cars}
                onSelect={(car) => {
                    router.push(`/`)
                }}
            />


            {/* ➕ FAB */}
            <Animated.View
                style={[
                    styles.fab,
                    animatedStyle,
                    { backgroundColor: '#006cff' },
                ]}
            >
                <Pressable
                    onPressIn={() =>
                        (scale.value = withTiming(0.92, { duration: 60 }))
                    }
                    onPressOut={() =>
                        (scale.value = withSpring(1, {
                            damping: 14,
                            stiffness: 180,
                        }))
                    }
                    onPress={() => {
                        Haptics.selectionAsync()
                        router.push('/car/add')
                    }}
                    style={styles.fabPress}
                >
                    <Text style={styles.fabIcon}>＋</Text>
                </Pressable>
            </Animated.View>

            {/* ❗ Error */}
            {error && (
                <Text style={{ color: 'red', marginTop: 12 }}>{error}</Text>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        marginTop: 50,
        marginBottom: 30,
    },

    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.6,
    },

    fab: {
        position: 'absolute',
        right: 20,
        bottom: 120,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 10,
    },

    fabPress: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fabIcon: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '600',
        marginTop: -2,
    },
})

