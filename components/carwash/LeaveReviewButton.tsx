import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, XStack } from 'tamagui'
import { Pencil  } from '@tamagui/lucide-icons'
import { ReviewModal } from './ReviewModal'
import {ReviewsList} from './ReviewsList'
import i18n from "@/i18n";

export function LeaveReviewButton({ washId, onReviewAdded }: {
    washId: string
    onReviewAdded: () => void
}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Pressable
                onPress={() => setOpen(true)}
                style={{
                    backgroundColor: '#b5b5b5',
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginTop: 5,
                }}
            >
                <XStack gap="$2" alignItems="center">
                    <Pencil size={18} color="white" />
                    <Text color="white" fontSize={15} fontWeight="600">
                        {i18n.t('booking.enterReview')}
                    </Text>
                </XStack>
            </Pressable>

            <ReviewModal
                open={open}
                onClose={() => {
                    setOpen(false)
                    onReviewAdded()
                }}
                washId={washId}
            />
        </>
    )
}
