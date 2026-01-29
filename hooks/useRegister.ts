import { useMutation } from '@tanstack/react-query'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api'

type RegisterPayload = {
    user_id: number
    name: string
    phone: string
    city?: string
    promoCode?: string | null
    token?: string
    lang: string | null
}

export function useRegister() {
    return useMutation({
        mutationFn: async (data: RegisterPayload) => {
            const res = await fetch(
                API_URL+'/user/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                }
            )
            console.log(res.body)

            if (res.status === 700) {
                console.log('already_exists')
                return { status: 'already_exists' as const }
            }

            if (!res.ok) {
                const err = await res.json()
                console.log(err)
                throw new Error(err.error || 'Ошибка регистрации')
            }

            return { status: 'ok' as const, user: await res.json() }
        },
    })
}
