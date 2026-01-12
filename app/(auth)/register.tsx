import { useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native'
import { YStack, Text, Input } from 'tamagui'
import { useLocalSearchParams, router } from 'expo-router'
import { useRegister } from '@/hooks/useRegister'
import { useAuthStore } from '@/store/useAuthStore'
import * as Haptics from 'expo-haptics'

export default function RegisterPage() {
    const { phone } = useLocalSearchParams<{ phone: string }>()
    const [name, setName] = useState('')
    const [city, setCity] = useState('')

    const setUser = useAuthStore((s) => s.setUser)
    const { mutate, isPending } = useRegister()

    const submit = () => {
        if (!name) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        mutate(
            {
                user_id: 123,
                phone,
                name,
                city,
            },
            {
                onSuccess: (res) => {
                    if (res.status === 'already_exists') {
                        router.replace('/')
                        return
                    }

                    if (res.status === 'ok') {
                        setUser(res.user)
                        router.replace('/')
                    }
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
                    Регистрация
                </Text>

                <Text color="$gray10">
                    Завершите регистрацию
                </Text>

                <Input
                    placeholder="Имя"
                    value={name}
                    onChangeText={setName}
                    size="$5"
                />

                <Input
                    placeholder="Город (необязательно)"
                    value={city}
                    onChangeText={setCity}
                    size="$5"
                />

                <Pressable
                    onPress={submit}
                    disabled={!name || isPending}
                    style={{
                        backgroundColor: '#4D77FF',
                        paddingVertical: 16,
                        borderRadius: 18,
                        alignItems: 'center',
                        opacity: isPending ? 0.6 : 1,
                    }}
                >
                    <Text color="white" fontWeight="600">
                        {isPending ? 'Сохранение…' : 'Продолжить'}
                    </Text>
                </Pressable>
            </YStack>
        </KeyboardAvoidingView>
    )
}
