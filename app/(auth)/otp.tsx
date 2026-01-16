import { useRef, useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput,
} from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, router } from 'expo-router'
import { useVerifyOtp } from '@/hooks/useVerifyOtp'
import { useAuthStore } from '@/store/useAuthStore'
import * as Haptics from 'expo-haptics'

const OTP_LENGTH = 4

export default function OtpPage() {
    const { phone, name, user_id } = useLocalSearchParams<{ phone: string
    name: string
    user_id?: string}>()
    const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(''))
    const inputs = useRef<TextInput[]>([])

    const { mutate, isPending, error } = useVerifyOtp()
    const setUser = useAuthStore((s) => s.setUser)

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return

        const next = [...code]
        next[index] = value
        setCode(next)

        if (value && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handleBackspace = (index: number) => {
        if (code[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }

    const submit = () => {
        const finalCode = code.join('')
        if (finalCode.length !== OTP_LENGTH) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        mutate(
            { code: finalCode, phone: phone },
            {
                onSuccess: (user) => {
                    setUser({user_id: user_id, phone: phone, name: name})
                    router.replace('/')
                },
            }
        )
    }

    return (
        <LinearGradient
            colors={['#006cff', '#0751ac']}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <YStack flex={1} justifyContent="center" px="$4">

                    {/* Card */}
                    <YStack
                        backgroundColor="rgba(255,255,255,0.06)"
                        borderRadius={28}
                        padding={24}
                        gap="$5"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.08)"
                    >
                        <Text fontSize={28} fontWeight="800" color="white">
                            Account verification
                        </Text>

                        <Text color="rgba(255,255,255,0.7)">
                            Enter verification code sent to {phone}
                        </Text>

                        {/* OTP boxes */}
                        <XStack justifyContent="space-between">
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        if (ref) inputs.current[index] = ref
                                    }}
                                    value={digit}
                                    onChangeText={(v) => handleChange(v, index)}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            handleBackspace(index)
                                        }
                                    }}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 14,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        color: 'white',
                                        backgroundColor: digit
                                            ? 'rgba(255,255,255,0.18)'
                                            : 'rgba(255,255,255,0.08)',
                                        borderWidth: 1,
                                        borderColor: digit
                                            ? '#ffffff'
                                            : 'rgba(255,255,255,0.25)',
                                    }}
                                />
                            ))}
                        </XStack>

                        {error && (
                            <Text color="#ffb4b4">
                                {(error as Error).message}
                            </Text>
                        )}

                        <Pressable
                            onPress={submit}
                            disabled={code.join('').length !== OTP_LENGTH || isPending}
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
                                {isPending ? 'Проверка…' : 'Подтвердить'}
                            </Text>
                        </Pressable>
                    </YStack>

                </YStack>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}
