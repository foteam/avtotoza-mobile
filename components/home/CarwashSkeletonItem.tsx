import { YStack, XStack } from 'tamagui'
import { useWindowDimensions } from 'react-native'

export function CarwashSkeletonItem() {
    const { width } = useWindowDimensions()

    return (
        <YStack
            height={190}
            borderRadius={18}
            bg="$backgroundSoft"
            overflow="hidden"
            mb="$4"
        >
            {/* banner */}
            <YStack height={120} bg="$gray3" />

            {/* content */}
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
    )
}
