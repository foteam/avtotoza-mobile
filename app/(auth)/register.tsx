import {useEffect, useState} from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard, Image
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
import { useCheckPromo } from '@/hooks/useCheckPromo'
import { useAuthStore } from '@/store/useAuthStore'
import * as Haptics from 'expo-haptics'
import { ChevronDown } from '@tamagui/lucide-icons'
import SelectDropdown from 'react-native-select-dropdown'
import {useSendOtp} from "@/hooks/useSendOtp";
import {registerForPushNotifications} from "@/lib/registerForPushNotifications";
import {useTranslation} from "react-i18next";
import i18n from '@/i18n'
import {logEvent} from "@/lib/analytics";

const CITIES = [
    { label: 'Наманган', value: 'Namangan' },
]

export default function RegisterPage() {
    const { phone } = useLocalSearchParams<{ phone: string }>()

    const [name, setName] = useState('')
    const [city, setCity] = useState<string>('')
    const [cityOpen, setCityOpen] = useState(false)
    const otp = useSendOtp()
    const [promo, setPromo] = useState('')
    const [promoState, setPromoState] = useState<
        'idle' | 'valid' | 'invalid'
    >('idle')

    const {
        mutate: checkPromo,
        data: promoResult,
        isPending: promoLoading,
    } = useCheckPromo()

    const setTempUserId = useAuthStore((s) => s.setTempUserId)
    const { mutate, isPending } = useRegister()
    const [pushToken, setPushToken] = useState<string | null>(null)

    useEffect(() => {
        registerForPushNotifications().then(setPushToken)
    }, [])

    const handleCheckPromo = () => {
        checkPromo(promo, {
            onSuccess: (res) => {
                console.log(res)
                if (res.valid) {
                    setPromoState('valid')
                } else {
                    setPromoState('invalid')
                }
            },
        })
    }

    const submit = () => {
        if (!name || !city) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        mutate(
            {
                phone: phone,
                name: name,
                city: city,
                promoCode: promoState === 'valid' ? promo : null,
                token: pushToken as string,
                user_id: Math.floor(100000 + Math.random() * 900000)
            },
            {
                onSuccess: (res) => {
                    if (res.status === 'ok') {
                        setTempUserId(res.user.user_id)
                        otp.mutate({phone: phone})
                        logEvent('register', {
                            user: phone
                        });
                        router.push({ pathname: '/(auth)/otp', params: { phone: phone, name: res.user?.name, user_id: res.user?.user_id, pushToken} })
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
                <YStack flex={1} justifyContent="center" px="$4" onPress={Keyboard.dismiss}>
                    <Image source={require('@/assets/logo/avtotoza_white_logo.png')} style={{width: 200, height: 30,  resizeMode: 'contain', alignSelf: "center", bottom: 40}} />
                    <YStack
                        backgroundColor="rgba(255,255,255,0.06)"
                        borderRadius={28}
                        padding={24}
                        gap="$4"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.08)"
                    >
                        <Text fontSize={30} fontWeight="800" color="white">
                            {i18n.t('register.title')}
                        </Text>

                        <Text color="rgba(255,255,255,0.7)" bottom={"$1.5"}>
                            {i18n.t('register.description')}
                        </Text>

                        {/* Имя */}
                        <Input
                            placeholder={i18n.t('register.name')}
                            value={name}
                            onChangeText={setName}
                            height={56}
                            fontSize={18}
                            fontWeight="600"
                            color="white"
                            cursorColor={"white"}
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
                            cursorColor={"white"}
                        />

                        {/* Город (Select) */}
                        <Pressable onPress={() => setCityOpen(true)}>
                            <YStack
                                {...inputStyle}
                                justifyContent="center"
                            >
                                <Text
                                    color={city ? 'white' : 'rgba(255,255,255,0.6)'}
                                    fontSize={18}
                                    fontWeight="600"
                                >
                                    {city
                                        ? CITIES.find((c) => c.value === city)?.label
                                        : i18n.t('register.city')}
                                </Text>
                            </YStack>
                        </Pressable>

                        {/* Промокод */}
                        <YStack gap="$2">
                            <Input
                                {...inputStyle}
                                placeholder={i18n.t('register.promoCode')}
                                value={promo}
                                onChangeText={(text) => {
                                    setPromo(text.toUpperCase())
                                    setPromoState('idle')
                                }}
                                onBlur={handleCheckPromo}
                                cursorColor={"white"}
                            />

                            {promoLoading && (
                                <Text color="rgba(255,255,255,0.6)" fontSize={14}>
                                    {i18n.t('register.promoCodeChecking')}
                                </Text>
                            )}

                            {promoState === 'valid' && promoResult?.valid && (
                                <Text color="#6CFF8E" fontSize={14} fontWeight="600">
                                    {i18n.t('register.promoCodeValid')} {promoResult.discount}%
                                </Text>
                            )}

                            {promoState === 'invalid' && (
                                <Text color="#FF6C6C" fontSize={14}>
                                    {i18n.t('register.promoCodeInvalid')}
                                </Text>
                            )}
                        </YStack>

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
                                {isPending ? i18n.t('register.pendingBtn') : i18n.t('register.registerBtn')}
                            </Text>
                        </Pressable>
                    </YStack>
                </YStack>
            </KeyboardAvoidingView>
            <Sheet
                modal
                open={cityOpen}
                onOpenChange={setCityOpen}
                snapPoints={[40]}
                dismissOnSnapToBottom
            >
                <Sheet.Overlay />
                <Sheet.Frame padding="$6" gap="$3" backgroundColor={"white"} borderRadius={"$10"} >
                    <Sheet.Handle backgroundColor="$white5" height={"$0.5"} width={"$2"} alignSelf={"center"} bottom={"$2"} />
                    <Text fontSize={18} fontWeight="700" color="black">
                        {i18n.t('register.city')}
                    </Text>

                    {CITIES.map((item) => (
                        <Pressable
                            key={item.value}
                            onPress={() => {
                                setCity(item.value)
                                setCityOpen(false)
                            }}
                            style={{
                                paddingVertical: 14,
                                borderBottomWidth: 1,
                                borderBottomColor: '#eee',
                            }}
                        >
                            <Text fontSize={16} color={"black"}>{i18n.language === "ru" ? item.label : item.value}</Text>
                        </Pressable>
                    ))}
                </Sheet.Frame>
            </Sheet>
        </LinearGradient>
    )
}
const inputStyle = {
    height: 56,
    fontSize: 18,
    fontWeight: '600' as const,
    color: 'white',
    placeholderTextColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 0,
    borderRadius: 16,
    paddingHorizontal: 16,
}