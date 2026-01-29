import { useRef, useState, useEffect } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput,
} from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, router } from 'expo-router'
import * as Haptics from 'expo-haptics'

import { useVerifyOtp } from '@/hooks/useVerifyOtp'
import { useSendOtp } from '@/hooks/useSendOtp'
import { useAuthStore } from '@/store/useAuthStore'
import { useConfirmLogin } from '@/hooks/useConfirmLogin'
import i18n from '@/i18n'

const OTP_LENGTH = 4
const RESEND_TIMEOUT = 60

export default function OtpPage() {
    const { phone, name, user_id, pushToken } =
        useLocalSearchParams<{
            phone: string
            name: string
            user_id?: string
            pushToken?: string
        }>()

    const [otp, setOtp] = useState('')
    const inputRef = useRef<TextInput>(null)

    const { mutate, isPending, error } = useVerifyOtp()
    const { mutate: sendOtp, isPending: resendPending } = useSendOtp()
    const confirmPushToken = useConfirmLogin()
    const setUser = useAuthStore((s) => s.setUser)

    const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT)
    const [canResend, setCanResend] = useState(false)

    /* ⏱ resend timer */
    useEffect(() => {
        if (secondsLeft === 0) {
            setCanResend(true)
            return
        }
        const timer = setTimeout(() => {
            setSecondsLeft((s) => s - 1)
        }, 1000)
        return () => clearTimeout(timer)
    }, [secondsLeft])

    /* 🔢 otp input */
    const handleOtpChange = (value: string) => {
        if (!/^\d*$/.test(value)) return

        setOtp(value)

        if (value.length === OTP_LENGTH) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
    }

    useEffect(() => {
        if (otp.length === OTP_LENGTH && !isPending) {
            const t = setTimeout(submit, 150)
            return () => clearTimeout(t)
        }
    }, [otp])

    /* 🔐 submit */
    const submit = () => {
        if (otp.length !== OTP_LENGTH) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        // ⚠️ DEV BYPASS (если нужен)
        if (otp === '7788' && phone === '+998 87 777 77 78') {
            setUser({ user_id: user_id as string, phone, name })
            confirmPushToken.mutate(
                {
                    user_id: String(user_id),
                    token: pushToken,
                    lang: i18n.language,
                },
                { onSuccess: () => router.replace('/') }
            )
            return
        }

        mutate(
            { code: otp, phone },
            {
                onSuccess: () => {
                    setUser({ user_id: user_id as string, phone, name })
                    confirmPushToken.mutate(
                        {
                            user_id: String(user_id),
                            token: pushToken,
                            lang: i18n.language,
                        },
                        { onSuccess: () => router.replace('/') }
                    )
                },
            }
        )
    }

    /* 🔁 resend */
    const handleResend = () => {
        if (!canResend || resendPending) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        sendOtp(
            { phone },
            {
                onSuccess: () => {
                    setOtp('')
                    setSecondsLeft(RESEND_TIMEOUT)
                    setCanResend(false)
                    inputRef.current?.focus()
                },
            }
        )
    }

    return (
        <LinearGradient colors={['#006cff', '#0751ac']} style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <YStack flex={1} justifyContent="center" px="$4">
                    {/* CARD */}
                    <YStack
                        backgroundColor="rgba(255,255,255,0.06)"
                        borderRadius={28}
                        padding={24}
                        gap="$5"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.08)"
                    >
                        <Text fontSize={28} fontWeight="800" color="white">
                            {i18n.t('otp.title')}
                        </Text>

                        <Text color="rgba(255,255,255,0.7)">
                            {i18n.t('otp.description')} {phone}
                        </Text>

                        {/* 🔒 HIDDEN INPUT */}
                        <TextInput
                            ref={inputRef}
                            value={otp}
                            onChangeText={handleOtpChange}
                            keyboardType="number-pad"
                            maxLength={OTP_LENGTH}
                            autoFocus
                            caretHidden
                            textContentType="oneTimeCode"
                            autoComplete="sms-otp"
                            importantForAutofill="yes"
                            style={{ position: 'absolute', opacity: 0 }}
                        />

                        {/* OTP BOXES */}
                        <XStack justifyContent="space-between">
                            {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                                const digit = otp[index] ?? ''
                                const isActive = index === otp.length

                                return (
                                    <Pressable
                                        key={index}
                                        onPress={() => inputRef.current?.focus()}
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 14,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: digit
                                                ? 'rgba(255,255,255,0.18)'
                                                : 'rgba(255,255,255,0.08)',
                                            borderWidth: 1.5,
                                            borderColor: isActive
                                                ? '#ffffff'
                                                : 'rgba(255,255,255,0.25)',
                                        }}
                                    >
                                        <Text fontSize={22} fontWeight="700" color="white">
                                            {digit}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        </XStack>

                        {error && (
                            <Text color="#ffb4b4">
                                {i18n.t('otp.errorMsg')}
                            </Text>
                        )}

                        {/* SUBMIT */}
                        <Pressable
                            onPress={submit}
                            disabled={otp.length !== OTP_LENGTH || isPending}
                            style={{
                                marginTop: 12,
                                backgroundColor: 'white',
                                paddingVertical: 16,
                                borderRadius: 18,
                                alignItems: 'center',
                                opacity: isPending ? 0.7 : 1,
                            }}
                        >
                            <Text fontWeight="700" color="#0751ac">
                                {isPending
                                    ? i18n.t('otp.pendingBtn')
                                    : i18n.t('otp.acceptBtn')}
                            </Text>
                        </Pressable>
                    </YStack>

                    {/* RESEND */}
                    <XStack justifyContent="center" marginTop="$3">
                        {!canResend ? (
                            <Text color="rgba(255,255,255,0.6)">
                                {i18n.t('otp.resendIn')} {secondsLeft}{' '}
                                {i18n.t('otp.seconds')}
                            </Text>
                        ) : (
                            <Pressable onPress={handleResend} disabled={resendPending}>
                                <Text
                                    color="white"
                                    fontWeight="600"
                                    opacity={resendPending ? 0.6 : 1}
                                >
                                    {i18n.t('otp.resendBtn')}
                                </Text>
                            </Pressable>
                        )}
                    </XStack>
                </YStack>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}
