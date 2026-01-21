import { XStack, YStack, Text, styled } from 'tamagui'
import {
    Pressable,
    useWindowDimensions,
    ScrollView, Image
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import {useTranslation} from "react-i18next";

const Card = styled(YStack, {
    borderRadius: '$6',
    overflow: 'hidden',

    pressStyle: {
        scale: 0.96,
    },
})

export function ServiceButtons({
                                   onPress,
                               }: {
    onPress?: (key: string) => void
}) {
    const { width } = useWindowDimensions()
    const {t} = useTranslation()

    const SERVICES = [
        {
            key: 'mobile_wash',
            title: t('services.carwash.title'),
            subtitle: t('services.carwash.description'),
            icon: require('@/assets/icons/services/car.png'),
            gradient: ['#006cff', '#0751ac'],
        },
        {
            key: 'fuel',
            title: t('services.fuel.title'),
            subtitle: t('services.fuel.description'),
            icon: require('@/assets/icons/services/petrol-pump.png'),
            gradient: ['#006cff', '#0751ac'],
        },
        {
            key: 'tire',
            title: t('services.tire.title'),
            subtitle: t('services.tire.description'),
            icon: require('@/assets/icons/services/speed.png'),
            gradient: ['#006cff', '#0751ac'],
        },
    ]

    // адаптивная ширина карточки
    const CARD_WIDTH = Math.min(width * 0.28, 130)

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: 12,
                paddingBottom: 20,
                paddingTop: 4
            }}
        >
            {SERVICES.map((s) => (
                <Pressable
                    key={s.key}
                    onPress={() => {
                        Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Medium
                        )
                        onPress?.(s.key)
                    }}
                >
                    <Card
                        width={CARD_WIDTH}
                        aspectRatio={1}
                    >
                        <LinearGradient
                            colors={[s.gradient[0], s.gradient[1]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                flex: 1,
                                padding: 12,
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* ICON */}
                            {/* PNG ICON */}
                            <YStack
                                width={36}
                                height={36}
                                borderRadius={18}
                                bg="rgba(255,255,255,0.22)"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    source={s.icon}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </YStack>

                            {/* TEXT */}
                            <YStack>
                                <Text
                                    color="white"
                                    fontSize={11}
                                    fontWeight="600"
                                    numberOfLines={2}
                                >
                                    {s.title}
                                </Text>

                                <Text
                                    color="rgba(255,255,255,0.85)"
                                    fontSize={9}
                                    mt={2}
                                    numberOfLines={1}
                                >
                                    {s.subtitle}
                                </Text>
                            </YStack>
                        </LinearGradient>
                    </Card>
                </Pressable>
            ))}
        </ScrollView>
    )
}
