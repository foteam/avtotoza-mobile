import { useState, useEffect } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native'
import { YStack, Text, Input } from 'tamagui'
import { useLocalSearchParams, router } from 'expo-router'
import { useVerifyOtp } from '@/hooks/useVerifyOtp'
import { useAuthStore } from '@/store/useAuthStore'
import * as Haptics from 'expo-haptics'

export default function OtpPage() {
    const { phone } = useLocalSearchParams<{ phone: string }>()
    const [code, setCode] = useState('')

    const { mutate, isPending, error } = useVerifyOtp()
    const setUser = useAuthStore((s) => s.setUser)

    const submit = () => {
        if (code.length !== 4) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        mutate(
            { phone, code },
            {
                onSuccess: (user) => {
                    setUser(user)
                    router.replace('/')
                },
            }
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <YStack flex={1} justifyContent="center" px="$4" gap="$4">
                <Text fontSize={26} fontWeight="700">
                    Подтверждение
                </Text>

                <Text color="$gray10">
                    Код отправлен на {phone}
                </Text>

                <Input
                    keyboardType="number-pad"
                    value={code}
                    onChangeText={setCode}
                    maxLength={4}
                    size="$5"
                    textAlign="center"
                    letterSpacing={8}
                />

                {error && (
                    <Text color="$red10">
                        {(error as Error).message}
                    </Text>
                )}

                <Pressable
                    onPress={submit}
                    disabled={code.length !== 4 || isPending}
                    style={{
                        backgroundColor: '#4D77FF',
                        paddingVertical: 16,
                        borderRadius: 18,
                        alignItems: 'center',
                        opacity: isPending ? 0.6 : 1,
                    }}
                >
                    <Text color="white" fontWeight="600">
                        {isPending ? 'Проверка…' : 'Войти'}
                    </Text>
                </Pressable>
            </YStack>
        </KeyboardAvoidingView>
    )
}
