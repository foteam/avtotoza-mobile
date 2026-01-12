import { useState } from 'react'
import {KeyboardAvoidingView, Platform, Pressable, TextInput} from 'react-native'
import { YStack, Text, Input } from 'tamagui'
import { useCheckPhone } from '@/hooks/useCheckPhone'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useAuthStore } from '@/store/useAuthStore'

function formatPhone(value: string) {
    let digits = value.replace(/\D/g, '')
    if (!digits.startsWith('998')) digits = '998' + digits
    digits = digits.slice(0, 12)

    const parts = [
        digits.slice(0, 3),
        digits.slice(3, 5),
        digits.slice(5, 8),
        digits.slice(8, 10),
        digits.slice(10, 12),
    ].filter(Boolean)

    return '+' + parts.join(' ')
}

export default function LoginPage() {
    const [phone, setPhone] = useState('+998')
    const { mutate, isPending } = useCheckPhone()
    const setTempUserId = useAuthStore((s) => s.setTempUserId)

    const submit = () => {
        const cleanPhone = phone.replace(/\D/g, '')
        if (cleanPhone.length < 12) return

        Haptics.selectionAsync()

        mutate(phone, {
            onSuccess: (res) => {
                if (res.exists && res.user?.user_id) {
                    // ✅ есть пользователь → OTP
                    setTempUserId(res.user.user_id)
                    router.push({
                        pathname: '/otp',
                        params: { phone },
                    })
                } else {
                    // ❌ нет → регистрация
                    router.push({
                        pathname: '/register',
                        params: { phone },
                    })
                }
            },
        })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <YStack flex={1} justifyContent="center" px="$4" gap="$4">
                <Text fontSize={26} fontWeight="700">
                    Вход
                </Text>

                <Text color="$gray10">
                    Введите номер телефона
                </Text>

                <TextInput
                    value={phone}
                    onChangeText={(t) => setPhone(formatPhone(t))}
                    keyboardType="phone-pad"
                    size="$5"

                    backgroundColor="$gray2"
                    borderColor="$gray4"
                    borderWidth={1}
                    borderRadius={16}

                    fontSize={18}
                    fontWeight="500"
                    color="$gray12"

                    placeholder="+998 90 123 45 67"
                    placeholderTextColor="$gray9"

                    paddingHorizontal={16}
                    height={56}

                    focusStyle={{
                        borderColor: '#4D77FF',
                        backgroundColor: '$gray1',
                    }}
                />


                <Pressable
                    onPress={submit}
                    disabled={phone.length < 17 || isPending}
                    style={{
                        backgroundColor: '#4D77FF',
                        paddingVertical: 16,
                        borderRadius: 18,
                        alignItems: 'center',
                        opacity: isPending ? 0.6 : 1,
                    }}
                >
                    <Text color="white" fontWeight="600">
                        {isPending ? 'Проверка…' : 'Продолжить'}
                    </Text>
                </Pressable>
            </YStack>
        </KeyboardAvoidingView>
    )
}
