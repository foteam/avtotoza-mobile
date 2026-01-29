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
import {useEffect, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import {logScreen, logEvent} from "@/lib/analytics";
export default function GaragePage() {
    const { colors } = useTheme()
    const { cars, loading, error, refetch } = useGarageCars()
    const {t} = useTranslation()

    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    const user = useAuthStore(state => state.user)
    useEffect(() => {
        logScreen('Garage Screen');
    }, []);
    useFocusEffect(
        useCallback(() => {
            if (user){
                refetch()
            }
        }, [])
    )

    // ⛔ Пока редиректим — ничего не рендерим
    //if (!user) return null


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                {t('garage.title')}
            </Text>
            {/* 🫥 Empty state */}
            {cars.length === 0 && !loading && (
                <Text style={styles.emptyText}>
                    {t('garage.nocars')}
                </Text>
            )}

            {/* 🚘 Cars list */}
            {loading ? (
                <GarageSkeleton count={4}/>
            ) : (
                <CarList
                    data={cars}
                    onSelect={(car) => {
                        console.log(car.model)
                    }}
                />
            )}


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
                        if (!user) {
                            router.replace('/(auth)/login')
                            return
                        }
                        Haptics.selectionAsync()
                        router.navigate('/(car)/add')
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

