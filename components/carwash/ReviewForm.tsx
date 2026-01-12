import { useState } from 'react'
import { TextInput, Pressable } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import * as Haptics from 'expo-haptics'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useCreateReview } from '@/hooks/useCreateReview'
import {RatingStars} from "@/components/carwash/RatingStars";

export function ReviewForm({
                               washId,
                               onSuccess,
                           }: {
    washId: string
    onSuccess?: () => void
}) {
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)

    const { mutate, isPending } = useCreateReview()

    const submit = () => {
        if (!comment.trim()) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        mutate(
            {
                washId,
                name: name || 'Гость',
                comment,
                rating,
            },
            {
                onSuccess: () => {
                    onSuccess?.()
                },
            }
        )
    }

    return (
        <YStack gap="$4">

            {/* ⭐ Rating */}
            <RatingStars value={rating} onChange={setRating} />

            {/* Name */}
            <TextInput
                placeholder="Ваше имя (необязательно)"
                value={name}
                onChangeText={setName}
                style={inputStyle}
            />

            {/* Comment */}
            <TextInput
                placeholder="Комментарий"
                value={comment}
                onChangeText={setComment}
                multiline
                style={[inputStyle, { minHeight: 90 }]}
            />

            {/* Submit */}
            <Pressable
                onPress={submit}
                disabled={isPending || !comment.trim()}
                style={[
                    buttonStyle,
                    (!comment.trim() || isPending) && { opacity: 0.5 },
                ]}
            >
                <Text color="white" fontSize={15} fontWeight="600">
                    {isPending ? 'Отправка…' : 'Отправить'}
                </Text>
            </Pressable>
        </YStack>
    )
}

const inputStyle = {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000',
}

const buttonStyle = {
    backgroundColor: '#006cff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
}
