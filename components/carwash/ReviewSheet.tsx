import {
    Modal,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
    StyleSheet,
    PanResponder,
} from 'react-native'
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import * as Haptics from 'expo-haptics'
import { ReviewForm } from './ReviewForm'

const { height } = Dimensions.get('window')
const SHEET_HEIGHT = height * 0.85
const CLOSE_THRESHOLD = 140

export function ReviewSheet({
                                open,
                                onClose,
                                washId,
                            }: {
    open: boolean
    onClose: () => void
    washId: string
}) {
    const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current

    // backdrop плавно исчезает по мере закрытия
    const backdropOpacity = translateY.interpolate({
        inputRange: [0, SHEET_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    })

    // ─── OPEN (ТОЛЬКО СНИЗУ) ───────────────────
    useEffect(() => {
        if (open) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

            Animated.timing(translateY, {
                toValue: 0,
                duration: 260,
                useNativeDriver: true,
            }).start()
        }
    }, [open])

    // ─── CLOSE ─────────────────────────────────
    const close = () => {
        Animated.timing(translateY, {
            toValue: SHEET_HEIGHT,
            duration: 220,
            useNativeDriver: true,
        }).start(() => onClose())
    }

    // ─── DRAG (ТОЛЬКО ВНИЗ) ─────────────────────
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, g) => g.dy > 6,

            onPanResponderMove: (_, g) => {
                if (g.dy > 0) {
                    translateY.setValue(g.dy)
                }
            },

            onPanResponderRelease: (_, g) => {
                if (g.dy > CLOSE_THRESHOLD) {
                    close()
                } else {
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }).start()
                }
            },
        })
    ).current

    if (!open) return null

    return (
        <Modal transparent visible animationType="none">
            {/* BACKDROP */}
            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        backgroundColor: 'rgba(0,0,0,0.32)',
                        opacity: backdropOpacity,
                    },
                ]}
            >
                <Pressable style={{ flex: 1 }} onPress={close} />
            </Animated.View>

            {/* SHEET */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, justifyContent: 'flex-end' }}
            >
                <Animated.View
                    {...panResponder.panHandlers}
                    style={{
                        transform: [{ translateY }],
                    }}
                >
                    <YStack
                        height={SHEET_HEIGHT}
                        bg="white"
                        borderTopLeftRadius={30}
                        borderTopRightRadius={30}
                        padding="$4"
                        paddingBottom={32}
                    >
                        {/* HANDLE */}
                        <XStack justifyContent="center" mb="$3">
                            <YStack
                                width={42}
                                height={4}
                                borderRadius={2}
                                bg="$gray6"
                            />
                        </XStack>

                        {/* HEADER */}
                        <XStack
                            justifyContent="space-between"
                            alignItems="center"
                            mb="$4"
                        >
                            <Text fontSize={18} fontWeight="700">
                                Оставить отзыв
                            </Text>

                            <Pressable onPress={close}>
                                <Text fontSize={15} color="$gray10">
                                    Закрыть
                                </Text>
                            </Pressable>
                        </XStack>

                        {/* FORM */}
                        <ReviewForm
                            washId={washId}
                            onSuccess={close}
                        />
                    </YStack>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    )
}
