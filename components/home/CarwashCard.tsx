import { ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

import { YStack, XStack, Text, styled } from 'tamagui'

type Props = {
    name: string
    address: string
    distance?: string
    rating?: number | string
    banner?: string
    isPremium?: boolean
    onPress?: () => void
}

/* ---------------- STYLED WRAPPER ---------------- */

const CardWrap = styled(YStack, {
    height: 190,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
})

export function CarwashCard({
                                name,
                                address,
                                distance,
                                rating,
                                banner,
                                isPremium,
                                onPress,
                            }: Props) {
    return (
        <Pressable onPress={onPress}>
            <CardWrap>
                <ImageBackground
                    source={{
                        uri: banner || 'https://via.placeholder.com/600x400',
                    }}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    imageStyle={{ borderRadius: 18 }}
                >
                    {/* Градиент */}
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.85)']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    />

                    {/* Контент */}
                    <YStack p="$3">
                        <Text
                            color="white"
                            fontSize={17}
                            fontWeight="900"
                            mb="$1"
                        >
                            {name}
                        </Text>

                        <XStack alignItems="center" gap="$1">
                            <MaterialCommunityIcons
                                name="map-marker"
                                size={14}
                                color="#D1D1D6"
                            />
                            <Text
                                color="#D1D1D6"
                                fontSize={13}
                                numberOfLines={1}
                                flex={1}
                            >
                                {address}
                            </Text>
                        </XStack>

                        <XStack
                            mt="$2"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            {distance && (
                                <XStack alignItems="center" gap="$2">
                                    <MaterialCommunityIcons
                                        name="crosshairs-gps"
                                        size={14}
                                        color="#D1D1D6"
                                    />
                                    <Text color="#D1D1D6" fontSize={13} fontWeight="600">
                                        {distance}
                                    </Text>

                                    {/* 👑 PREMIUM */}
                                    {isPremium && (
                                        <LinearGradient
                                            colors={['#FFD76A', '#E5B100']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{
                                                paddingHorizontal: 8,
                                                paddingVertical: 4,
                                                borderRadius: 10,
                                            }}
                                        >
                                            <XStack alignItems="center" gap={4}>
                                                <MaterialCommunityIcons
                                                    name="crown"
                                                    size={12}
                                                    color="#4A3A00"
                                                />
                                                <Text
                                                    fontSize={11}
                                                    fontWeight="700"
                                                    color="#4A3A00"
                                                >
                                                    Премиум
                                                </Text>
                                            </XStack>
                                        </LinearGradient>
                                    )}
                                </XStack>
                            )}

                            <XStack alignItems="center" gap="$1">
                                <MaterialCommunityIcons
                                    name="star"
                                    size={14}
                                    color="#FFD60A"
                                />
                                <Text
                                    color="white"
                                    fontSize={13}
                                    fontWeight="500"
                                >
                                    {rating ?? '—'}
                                </Text>
                            </XStack>
                        </XStack>
                    </YStack>
                </ImageBackground>
            </CardWrap>
        </Pressable>
    )
}
