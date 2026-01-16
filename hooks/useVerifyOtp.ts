import { useMutation } from '@tanstack/react-query'

type VerifyPayload = {
    phone: string
    code: string
}
const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
export function useVerifyOtp() {
    return useMutation({
        mutationFn: async (data: VerifyPayload) => {
            const res = await fetch(
                `${API_URL}/auth/verify-code`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                }
            )
            console.log(data)
            if (!res.ok) {
                throw new Error('Неверный код')
            }

            return res.json() // user + token
        },
    })
}
