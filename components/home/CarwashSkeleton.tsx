import { YStack, XStack } from 'tamagui'
import { useWindowDimensions } from 'react-native'

type Props = {
    count?: number
}

export function CarwashSkeleton({ count = 3 }: Props) {
    const { width } = useWindowDimensions()

    return (
        <YStack gap="$4" pb="$4">
            {Array.from({ length: count }).map((_, i) => (
                <YStack
                    key={i}
                    height={190}          // как CarwashCard
                    borderRadius={18}
                    bg="$backgroundSoft"
                    overflow="hidden"
                >
                    {/* верхний баннер */}
                    <YStack
                        height={120}
                        bg="$gray3"
                    />

                    {/* контент */}
                    <YStack p="$3" gap="$2">
                        <YStack
                            height={16}
                            width={width * 0.5}
                            bg="$gray4"
                            borderRadius={6}
                        />

                        <YStack
                            height={12}
                            width={width * 0.7}
                            bg="$gray3"
                            borderRadius={6}
                        />

                        <XStack mt="$2" justifyContent="space-between">
                            <YStack
                                height={12}
                                width={60}
                                bg="$gray3"
                                borderRadius={6}
                            />

                            <YStack
                                height={12}
                                width={40}
                                bg="$gray3"
                                borderRadius={6}
                            />
                        </XStack>
                    </YStack>
                </YStack>
            ))}
        </YStack>
    )
}
