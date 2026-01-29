import { useState } from 'react'
import { TextInput, Pressable } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import * as Haptics from 'expo-haptics'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useCreateReview } from '@/hooks/useCreateReview'
import {RatingStars} from "@/components/carwash/RatingStars";
import { StyleSheet } from 'react-native'
import { useAuthStore } from '@/store/useAuthStore'
import { useReviews } from '@/hooks/useReviews'
import i18n from "@/i18n";


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

    const { user } = useAuthStore()
    const { mutate, isPending } = useCreateReview()

    const submit = () => {
        if (!comment.trim()) return

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        mutate(
            {
                washId,
                user_id: user?.user_id || "0",
                name: name || 'User',
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
                placeholder={i18n.t('booking.reviewsForm.name')}
                value={name}
                onChangeText={setName}
                style={inputStyle}
            />

            {/* Comment */}
            <TextInput
                placeholder={i18n.t('booking.reviewsForm.comment')}
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
                    button.buttonStyle,
                    (!comment.trim() || isPending) && { opacity: 0.5 },
                ]}
            >
                <Text color="white" fontSize={15} fontWeight="600">
                    {isPending ? i18n.t('booking.reviewsForm.pendingBtn') : i18n.t('booking.reviewsForm.sendBtn')}
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

const button = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#006cff',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    }
});
