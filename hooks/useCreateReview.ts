import { useMutation } from '@tanstack/react-query'

type ReviewPayload = {
    user_id: string
    washId: string
    name: string
    comment: string
    rating: number
}
const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
export function useCreateReview() {
    return useMutation({
        mutationFn: async (data: ReviewPayload) => {
            const res = await fetch(
                API_URL+'/review',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!res.ok) {
                throw new Error('Ошибка отправки отзыва')
            }

            return res.json()
        },
    })
}
