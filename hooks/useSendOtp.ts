import { useMutation } from '@tanstack/react-query'
const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
export function useSendOtp() {
    return useMutation({
        mutationFn: async (phone: string) => {
            const res = await fetch(
                `${API_URL}/auth/send-code`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone }),
                }
            )
            console.log(res.json)
            if (!res.ok) {
                throw new Error('Не удалось отправить код')
            }

            return res.json()
        },
    })
}
