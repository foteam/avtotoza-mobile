import {
    Modal,
    Pressable,
    Animated,
    StyleSheet,
} from 'react-native'
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import * as Haptics from 'expo-haptics'
import { ReviewForm } from './ReviewForm'
import i18n from "@/i18n";

export function ReviewModal({
                                open,
                                onClose,
                                washId,
                            }: {
    open: boolean
    onClose: () => void
    washId: string
}) {
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (open) {
            Haptics.selectionAsync()

            Animated.timing(opacity, {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 140,
                useNativeDriver: true,
            }).start()
        }
    }, [open])

    if (!open) return null

    return (
        <Modal transparent visible animationType="none">
            {/* BACKDROP */}
            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        opacity,
                    },
                ]}
            >
                <Pressable style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>

            {/* MODAL */}
            <Animated.View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity,
                }}
            >
                <YStack
                    width="92%"
                    maxWidth={420}
                    bg="white"
                    borderRadius={24}
                    padding="$4"
                >
                    {/* HEADER */}
                    <XStack
                        alignItems="center"
                        justifyContent="space-between"
                        mb="$2"
                    >
                        <Text fontSize={18} fontWeight="700" color={"white0"}>
                            {i18n.t('booking.reviewsForm.title')}
                        </Text>

                        <Pressable onPress={onClose} >
                            <Text fontSize={25} color="$gray9">
                                ✕
                            </Text>
                        </Pressable>
                    </XStack>

                    {/* SUBTITLE */}
                    <Text
                        fontSize={14}
                        color="$gray10"
                        mb="$3"
                    >
                        {i18n.t('booking.reviewsForm.description')}
                    </Text>

                    {/* FORM */}
                    <ReviewForm
                        washId={washId}
                        onSuccess={onClose}
                    />
                </YStack>
            </Animated.View>
        </Modal>
    )
}
