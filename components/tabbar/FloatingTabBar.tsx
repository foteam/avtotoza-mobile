import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as Haptics from 'expo-haptics'
import { Platform, Pressable, StyleSheet, Dimensions } from 'react-native'
import { XStack, YStack, Text, styled } from 'tamagui'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated'

import { TAB_CONFIG } from './tabIcons'

const BAR_HEIGHT = 64
const SCREEN_WIDTH = Dimensions.get('window').width + 115
const H_PADDING = 16
const PILL_PADDING = 6

/* ---------------- LAYOUT ---------------- */

const Wrapper = styled(YStack, {
    position: 'absolute',
    left: H_PADDING,
    right: H_PADDING,
    bottom: Platform.OS === 'ios' ? 28 : 16,
})

const Pill = styled(XStack, {
    height: BAR_HEIGHT,
    borderRadius: 32,
    bg: '#f7f7f7',
    alignItems: 'center',
    padding: PILL_PADDING,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
})

const Segment = styled(YStack, {
    flex: 1,
    height: '100%',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
})

const AnimatedActive = Animated.createAnimatedComponent(YStack)

/* ---------------- COMPONENT ---------------- */

export function FloatingTabBar({
                                   state,
                                   navigation,
                               }: BottomTabBarProps) {
    const tabCount = state.routes.length
    const segmentWidth =
        (SCREEN_WIDTH - H_PADDING * 2 - PILL_PADDING * 2) /
        tabCount
    console.log()

    const translateX = useSharedValue(
        segmentWidth * state.index
    )

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withSpring(translateX.value, {
                    damping: 24,
                    stiffness: 120,
                    duration: 10,
                }),
            },
        ],
    }))

    return (
        <Wrapper>
            <Pill>
                {/* 🔥 ОДНА АНИМИРОВАННАЯ КАПСУЛА */}
                <AnimatedActive
                    style={[
                        {
                            position: 'absolute',
                            left: PILL_PADDING,
                            width: segmentWidth,
                            height: BAR_HEIGHT - PILL_PADDING * 2,
                            borderRadius: 26,
                            backgroundColor: '#FFFFFF',
                            shadowColor: '#000',
                            shadowOpacity: 0.06,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                        },
                        animatedStyle,
                    ]}
                />

                {state.routes.map((route, index) => {
                    const focused = state.index === index
                    const config = TAB_CONFIG[route.name]
                    if (!config) return null

                    return (
                        <Pressable
                            key={route.key}
                            style={{ flex: 1 }}
                            onPress={() => {
                                if (!focused) {
                                    Haptics.selectionAsync()
                                    translateX.value = segmentWidth * index
                                    navigation.navigate(route.name)
                                }
                            }}
                        >
                            <Segment>
                                <MaterialCommunityIcons
                                    name={config.icon as any}
                                    size={20}
                                    color={focused ? '#006cff' : '#111'}
                                />

                                <Text
                                    mt={4}
                                    fontSize={12}
                                    fontWeight="600"
                                    color={focused ? '#006cff' : '#111'}
                                >
                                    {config.label}
                                </Text>
                            </Segment>
                        </Pressable>
                    )
                })}
            </Pill>
        </Wrapper>
    )
}
