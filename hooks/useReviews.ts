import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api'

export type Review = {
    _id: string
    wash: string
    name: string
    comment: string
    rating: number
    createdAt: string
}

export function useReviews(washId?: string) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(false)

    const load = useCallback(async () => {
        if (!washId) return

        try {
            setLoading(true)
            const res = await axios.get(
                `${API_URL}/review/${washId}`
            )

            setReviews(res.data.reviews || [])
        } catch (e) {
            console.error('Load reviews error', e)
        } finally {
            console.log("Reviews loaded")
            setLoading(false)
        }
    }, [washId])

    useEffect(() => {
        load()
    }, [load])

    return {
        reviews,
        loading,
        refetch: load
    }
}
