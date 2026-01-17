import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api'

type AddCarPayload = {
    brand: string
    model: string
    year?: string
    color?: string
    plateNumber: string
    bodyType?: string
    fuelType?: string
    image?: string | null
    isPrimary?: boolean
}

export function useAddCar(onSuccess?: () => void) {
    const user = useAuthStore((s) => s.user)

    return useMutation({
        mutationFn: async (data: AddCarPayload) => {
            if (!user?.user_id) {
                throw new Error('User not found')
            }

            const res = await axios.post(
                `${API_URL}/user/garage/car/add`,
                {
                    user_id: user.user_id,
                    ...data,
                }
            )

            return res.data
        },

        onSuccess: () => {
            onSuccess?.()
        },
    })
}
