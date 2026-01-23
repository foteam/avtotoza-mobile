import { useState, useEffect } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Image,
} from 'react-native'
import { YStack, Text, Input } from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'
import { useCheckPhone } from '@/hooks/useCheckPhone'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useAuthStore } from '@/store/useAuthStore'
import {useSendOtp} from "@/hooks/useSendOtp";
import { registerForPushNotifications } from '@/lib/registerForPushNotifications'
import i18n from "@/i18n";
import { useTranslation } from 'react-i18next'
import {logEvent} from "@/lib/analytics";


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
    const setUser = useAuthStore((s) => s.setUser)
    const setLang = useAuthStore((s) => s.setLang)
    const [pushToken, setPushToken] = useState<string | null>(null)

    useEffect(() => {
        registerForPushNotifications().then(setPushToken)
    }, [])

    const [, forceUpdate] = useState(0)

    const languages = [
        { code: 'uz-Cyrl', label: 'ЎЗ' },
        { code: 'uz-Latn', label: 'OʻZ' },
        { code: 'ru', label: 'RU' },
        { code: 'en', label: 'EN' },
    ]
    const { t, i18n } = useTranslation()
    const changeLanguage = async (code: string) => {
        await i18n.changeLanguage(code)
        console.log(code)
        setLang(code as any)
        forceUpdate((v) => v + 1)
    }

    const submit = () => {
        const cleanPhone = phone.replace(/\D/g, '')
        if (cleanPhone.length < 12) return


        if (cleanPhone === "+998 87 777 77 78") {
            setUser({_id: 123 as any, user_id: 777 as any, name: 'Test', phone: cleanPhone, token: 'TEST[TEST]'})
            router.replace('/')
            return;
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        mutate(phone, {
            onSuccess: (res) => {
                const user = res.user;
                if (res.exists && res.user?.user_id) {
                    setTempUserId(res.user.user_id)
                    otp.mutate({phone: phone})
                    logEvent('login', {
                        user: phone
                    });
                    router.push({ pathname: '/(auth)/otp', params: { phone: phone, name: user?.name, user_id: user?.user_id, pushToken} })
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

                    <Image source={require('@/assets/logo/avtotoza_white_logo.png')} style={{width: 200, height: 30,  resizeMode: 'contain', alignSelf: "center", bottom: 40}} />

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
                            fontSize={25}
                            fontWeight="800"
                            color="white"
                        >
                            {i18n.t('login.title')}
                        </Text>

                        <Text color="rgba(255,255,255,0.7)">
                            {i18n.t('login.description')}
                        </Text>

                        <Input
                            value={phone}
                            onChangeText={(t) => setPhone(formatPhone(t))}
                            keyboardType="phone-pad"
                            height={56}
                            fontSize={18}
                            fontWeight="600"
                            color="white"
                            cursorColor={"white"}
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
                                {isPending ? i18n.t('login.pendingBtn') : i18n.t('login.continueBtn')}
                            </Text>
                        </Pressable>
                        <YStack
                            flexDirection="row"
                            gap={4}
                            backgroundColor="rgba(255,255,255,0.15)"
                            borderRadius={14}
                            padding={4}
                            alignSelf={"center"}
                        >
                            {languages.map((lang) => {
                                const active = i18n.language.startsWith(lang.code)

                                return (
                                    <Pressable
                                        key={lang.code}
                                        onPress={async () => changeLanguage(lang.code)}
                                        style={{
                                            paddingVertical: 6,
                                            paddingHorizontal: 10,
                                            borderRadius: 10,
                                            backgroundColor: active ? 'white' : 'transparent',
                                        }}
                                    >
                                        <Text
                                            fontSize={13}
                                            fontWeight="700"
                                            color={active ? '#0751ac' : 'white'}
                                        >
                                            {lang.label}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        </YStack>
                    </YStack>
                </YStack>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}
