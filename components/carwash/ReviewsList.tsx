import { useState } from 'react'
import { Text, XStack, YStack, Button, Separator } from 'tamagui'
import { Star } from '@tamagui/lucide-icons'
import { useReviews } from '@/hooks/useReviews'

const PREVIEW_COUNT = 2

export function ReviewsList({ washId }: { washId: string }) {
    const { reviews, loading } = useReviews(washId)
    const [showAll, setShowAll] = useState(false)

    if (loading) {
        return (
            <Text color="$gray10" marginTop="$4">
                Загружаем отзывы…
            </Text>
        )
    }

    if (reviews.length === 0) {
        return (
            <Text color="$gray10" marginTop="$4">
                Пока нет отзывов
            </Text>
        )
    }

    const visibleReviews = showAll
        ? reviews
        : reviews.slice(0, PREVIEW_COUNT)

    return (
        <YStack marginTop="$6" gap="$4">
            {/* ===== HEADER ===== */}
            <XStack alignItems="center" justifyContent="space-between">
                <Text fontSize="$4" fontWeight="700" color={"black"}>
                    Отзывы
                </Text>

                <XStack alignItems="center" gap="$1">
                    <Star size={16} color="#f5b50a" fill="#f5b50a" />
                    <Text fontWeight="600" color={"black"}>
                        {(
                            reviews.reduce((s, r) => s + r.rating, 0) /
                            reviews.length
                        ).toFixed(1)}
                    </Text>
                </XStack>
            </XStack>

            {/* ===== LIST ===== */}
            <YStack gap="$3">
                {visibleReviews.map((r) => (
                    <YStack
                        key={r._id}
                        padding="$4"
                        borderRadius="$6"
                        backgroundColor="$white1"
                        gap="$3"
                    >
                        {/* TOP */}
                        <XStack
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            {/* Stars */}
                            <XStack gap="$1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={`${r._id}-star-${i}`}
                                        size={14}
                                        color={
                                            i < r.rating
                                                ? '#f5b50a'
                                                : '#d0d0d0'
                                        }
                                        fill={
                                            i < r.rating
                                                ? '#f5b50a'
                                                : 'transparent'
                                        }
                                    />
                                ))}
                            </XStack>

                            {/* Date */}
                            <Text fontSize="$2" color="$gray9">
                                {new Date(
                                    r.createdAt
                                ).toLocaleDateString()}
                            </Text>
                        </XStack>

                        {/* Comment */}
                        <Text fontSize="$2" lineHeight={20} color="$gray9">
                            {r.comment}
                        </Text>

                        {/* Author */}
                        <Text fontSize="$1" color="$gray9" fontWeight="800">
                            {r.name || 'Пользователь'}
                        </Text>
                    </YStack>
                ))}
            </YStack>

            {/* ===== SHOW MORE ===== */}
            {reviews.length > PREVIEW_COUNT && !showAll && (
                <Button
                    bottom={"$5"}
                    size="$4"
                    theme="gray"
                    backgroundColor={"transparent"}
                    onPress={() => setShowAll(true)}
                >
                    <Text color={"$gray10"}>
                        Показать все отзывы ({reviews.length})
                    </Text>
                </Button>
            )}
        </YStack>
    )
}
