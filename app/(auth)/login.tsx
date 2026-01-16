import { useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native'
import { YStack, Text, Input } from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'
import { useCheckPhone } from '@/hooks/useCheckPhone'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useAuthStore } from '@/store/useAuthStore'
import {useSendOtp} from "@/hooks/useSendOtp";

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
    const otp = useSendOtp()
    const setTempUserId = useAuthStore((s) => s.setTempUserId)

    const submit = () => {
        const cleanPhone = phone.replace(/\D/g, '')
        if (cleanPhone.length < 12) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        mutate(phone, {
            onSuccess: (res) => {
                const user = res.user;
                if (res.exists && res.user?.user_id) {
                    otp.mutate(phone)
                    setTempUserId(res.user.user_id)
                    router.push({ pathname: '/(auth)/otp', params: { phone: phone, name: user?.name, user_id: user?.user_id} })
                } else {
                    router.push({ pathname: '/(auth)/register', params: { phone } })
                }
            },
            onError: (err) => {
                console.log(err)
            }
        })
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
                        gap="$4"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.08)"
                    >
                        <Text
                            fontSize={30}
                            fontWeight="800"
                            color="white"
                        >
                            Добро пожаловать
                        </Text>

                        <Text color="rgba(255,255,255,0.7)">
                            Введите номер телефона для входа
                        </Text>

                        <Input
                            value={phone}
                            onChangeText={(t) => setPhone(formatPhone(t))}
                            keyboardType="phone-pad"
                            height={56}
                            fontSize={18}
                            fontWeight="600"
                            color="white"
                            placeholder="+998 90 123 45 67"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            backgroundColor="rgba(255,255,255,0.08)"
                            borderWidth={0}
                            borderRadius={16}
                            paddingHorizontal={16}
                            focusStyle={{
                                backgroundColor: 'rgba(255,255,255,0.12)',
                            }}
                        />

                        <Pressable
                            onPress={submit}
                            disabled={phone.length < 17 || isPending}
                            style={{
                                marginTop: 8,
                                backgroundColor: 'white',
                                paddingVertical: 16,
                                borderRadius: 18,
                                alignItems: 'center',
                                opacity: isPending ? 0.7 : 1,
                                shadowColor: '#4D77FF',
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                            }}
                        >
                            <Text
                                color="#0751ac"
                                fontWeight="700"
                                fontSize={16}
                            >
                                {isPending ? 'Проверка…' : 'Продолжить'}
                            </Text>
                        </Pressable>
                    </YStack>

                </YStack>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}
