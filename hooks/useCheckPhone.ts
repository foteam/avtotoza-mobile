import { useMutation } from '@tanstack/react-query'

type CheckPhoneResponse = {
    exists: boolean
    user?: {
        _id: string
        user_id: number
        phone: string
        name?: string
    }
}
const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
export function useCheckPhone() {
    return useMutation({
        mutationFn: async (phone: string): Promise<CheckPhoneResponse> => {
            const res = await fetch(
                `${API_URL}/user/phone/check/${encodeURIComponent(
                    phone
                )}`
            )

            if (!res.ok) {
                throw new Error('Ошибка проверки номера')
            }

            return res.json()
        },
    })
}
