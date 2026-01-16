import { useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native'
import {
    YStack,
    Text,
    Input,
    Select,
    Adapt,
    Sheet,
} from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, router } from 'expo-router'
import { useRegister } from '@/hooks/useRegister'
import { useAuthStore } from '@/store/useAuthStore'
import * as Haptics from 'expo-haptics'
import { ChevronDown } from '@tamagui/lucide-icons'
import SelectDropdown from 'react-native-select-dropdown'

const CITIES = [
    { label: 'Наманган', value: 'Namangan' },
]

export default function RegisterPage() {
    const { phone } = useLocalSearchParams<{ phone: string }>()

    const [name, setName] = useState('')
    const [promo, setPromo] = useState('')
    const [city, setCity] = useState<string>('')
    const [cityOpen, setCityOpen] = useState(false)

    const setUser = useAuthStore((s) => s.setUser)
    const { mutate, isPending } = useRegister()

    const submit = () => {
        if (!name || !city) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        mutate(
            {
                phone,
                name,
                city,
                promoCode: promo || null,
            },
            {
                onSuccess: (res) => {
                    if (res.status === 'ok') {
                        setUser(res.user)
                        router.replace('/')
                    }
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
                    <YStack
                        backgroundColor="rgba(255,255,255,0.06)"
                        borderRadius={28}
                        padding={24}
                        gap="$4"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.08)"
                    >
                        <Text fontSize={30} fontWeight="800" color="white">
                            Регистрация
                        </Text>

                        <Text color="rgba(255,255,255,0.7)">
                            Заполните данные профиля
                        </Text>

                        {/* Имя */}
                        <Input
                            placeholder="Имя"
                            value={name}
                            onChangeText={setName}
                            height={56}
                            fontSize={18}
                            fontWeight="600"
                            color="white"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            backgroundColor="rgba(255,255,255,0.08)"
                            borderWidth={0}
                            borderRadius={16}
                            paddingHorizontal={16}
                        />

                        {/* Телефон */}
                        <Input
                            value={phone}
                            editable={false}
                            height={56}
                            fontSize={18}
                            fontWeight="600"
                            color="rgba(255,255,255,0.6)"
                            backgroundColor="rgba(255,255,255,0.05)"
                            borderWidth={0}
                            borderRadius={16}
                            paddingHorizontal={16}
                        />

                        {/* Город (Select) */}
                        <Select
                            native
                            value={city}
                            onValueChange={setCity}
                        >
                            <Select.Trigger
                                height={56}
                                borderRadius={16}
                                backgroundColor="rgba(255,255,255,0.08)"
                                borderWidth={0}
                                paddingHorizontal={16}
                                iconAfter={ChevronDown}
                            >
                                <Select.Value
                                    placeholder="Выберите город"
                                    color={city ? 'white' : 'rgba(255,255,255,0.6)'}
                                />
                            </Select.Trigger>

                            <Select.Content>
                                {CITIES.map((item, i) => (
                                    <Select.Item
                                        key={item.value}
                                        index={i}
                                        value={item.value}
                                    >
                                        <Select.ItemText>
                                            {item.label}
                                        </Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select>


                        {/* Промокод */}
                        <Input
                            placeholder="Промокод (необязательно)"
                            value={promo}
                            onChangeText={setPromo}
                            height={56}
                            fontSize={16}
                            color="white"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            backgroundColor="rgba(255,255,255,0.08)"
                            borderWidth={0}
                            borderRadius={16}
                            paddingHorizontal={16}
                        />

                        {/* CTA */}
                        <Pressable
                            onPress={submit}
                            disabled={!name || !city || isPending}
                            style={{
                                marginTop: 8,
                                backgroundColor: 'white',
                                paddingVertical: 16,
                                borderRadius: 18,
                                alignItems: 'center',
                                opacity: !name || !city || isPending ? 0.7 : 1,
                            }}
                        >
                            <Text color="#0751ac" fontWeight="700" fontSize={16}>
                                {isPending ? 'Сохранение…' : 'Завершить регистрацию'}
                            </Text>
                        </Pressable>
                    </YStack>
                </YStack>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}
