import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import {router} from 'expo-router'
import { CarList } from '../../components/garage/CarList'
import { GarageSkeleton } from '../../components/garage/GarageSkeleton'
import * as Haptics from 'expo-haptics'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated'

const DATA = [
    {
        id: '1',
        brand: 'Chevrolet',
        model: 'Malibu',
        plate: '01A123BC',
        image:
            'https://i.ibb.co/R4cLCjgX/Chevrolet-Equinox-Mk3f-Premier-2020-1000-0005.jpg',
    },
    {
        id: '2',
        brand: 'Chevrolet',
        model: 'Equinox',
        plate: '10B456CD',
        image:
            'https://i.ibb.co/R4cLCjgX/Chevrolet-Equinox-Mk3f-Premier-2020-1000-0005.jpg',
    },
]

export default function GaragePage() {
    const { colors } = useTheme()

    const isLoading = false
    const cars = DATA

    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    if (isLoading) {
        return <GarageSkeleton />
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title — как в Home */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                Гараж
            </Text>

            {/* 🚘 List — ТОЧНО как список моек */}
            <CarList
                data={cars}
                onSelect={(car) => {
                    console.log('OPEN CAR', car.id)
                }}
            />

            {/* ➕ CTA — как в Home */}
            <Animated.View style={[styles.fab, animatedStyle, { backgroundColor: "#006cff" }]}>
                <Pressable
                    onPressIn={() => {
                        scale.value = withTiming(0.92, { duration: 50 })
                    }}
                    onPressOut={() => {
                        scale.value = withSpring(1, { damping: 15, stiffness: 180})
                    }}
                    onPress={() => {
                        Haptics.selectionAsync()
                        router.push('/car/add')
                    }}
                    style={styles.fabPress}
                >
                    <Text style={styles.fabIcon}>＋</Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16, // 👈 как Home
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        marginTop: 50,
        marginBottom: 30,
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

        // iOS shadow
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
