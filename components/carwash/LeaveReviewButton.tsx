import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'
import { ReviewSheet } from './ReviewSheet'
import {ReviewModal} from './ReviewModal'

export function LeaveReviewButton({ washId }: { washId: string }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Pressable
                onPress={() => setOpen(true)}
                style={{
                    backgroundColor: '#006cff',
                    paddingVertical: 14,
                    borderRadius: 16,
                    alignItems: 'center',
                    marginTop: 24,
                }}
            >
                <Text color="white" fontSize={16} fontWeight="600">
                    Оставить отзыв
                </Text>
            </Pressable>
            <ReviewModal open={open} onClose={() => setOpen(false)} washId={washId} />
        </>
    )
}
