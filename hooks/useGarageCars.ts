import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api'

export interface GarageCar {
    _id: string
    user_id: string
    isPrimary: boolean
    brand: string
    model: string
    year?: number
    color?: string
    plateNumber?: string
    image?: string | null
    cleanliness: number
    createdAt: string
}

export function useGarageCars() {
    const { user } = useAuthStore()

    const [cars, setCars] = useState<GarageCar[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchCars = async () => {
        if (!user?.user_id) {
            setCars([])
            setLoading(false)
            return
        }
        if (!user?.user_id) return

        try {
            setLoading(true)
            setError(null)
            console.log(user.user_id)

            const res = await axios.get(
                `${API_URL}/user/garage/cars/${user.user_id}`
            )

            setCars(res.data.cars || [])
        } catch (e: any) {
            console.error('useGarageCars error:', e)
            setError('Не удалось загрузить гараж')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCars()
    }, [user?.user_id])

    return {
        cars,
        loading,
        error,
        refetch: fetchCars,
    }
}
