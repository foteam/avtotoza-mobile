import { YStack, XStack } from 'tamagui'
import { useWindowDimensions } from 'react-native'
import { SkeletonBlock } from '@/components/SkeletonBlock'

export function CarwashSkeletonItem() {
    const { width } = useWindowDimensions()

    return (
        <YStack
            height={190}
            borderRadius={18}
            overflow="hidden"
            mb={16}
            bg="#E5E5EA"
        >
            {/* 🖼 BANNER */}
            <SkeletonBlock
                width="100%"
                height={120}
                radius={0}
                style={{bottom: 25}}
            />

            {/* 📦 CONTENT */}
            <YStack p={12} bottom={25} gap={6}>
                {/* TITLE */}
                <SkeletonBlock
                    width={width * 0.55}
                    height={18}
                    radius={6}
                />

                {/* ADDRESS */}
                <SkeletonBlock
                    width={width * 0.75}
                    height={14}
                    radius={6}
                />

                {/* BOTTOM ROW */}
                <XStack
                    mt={8}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {/* distance + premium */}
                    <XStack gap={8} alignItems="center">
                        <SkeletonBlock
                            width={80}
                            height={14}
                            radius={6}
                        />

                        {/* premium badge */}
                        <SkeletonBlock
                            width={64}
                            height={20}
                            radius={10}
                        />
                    </XStack>

                    {/* rating */}
                    <XStack gap={6} alignItems="center">
                        <SkeletonBlock
                            width={14}
                            height={14}
                            radius={7}
                        />
                        <SkeletonBlock
                            width={32}
                            height={14}
                            radius={6}
                        />
                    </XStack>
                </XStack>
            </YStack>
        </YStack>
    )
}
