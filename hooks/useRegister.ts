import { useMutation } from '@tanstack/react-query'

type RegisterPayload = {
    user_id: number
    name: string
    phone: string
    city?: string
    promoCode?: string
}

export function useRegister() {
    return useMutation({
        mutationFn: async (data: RegisterPayload) => {
            const res = await fetch(
                'https://YOUR_DOMAIN/api/user/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                }
            )

            if (res.status === 700) {
                return { status: 'already_exists' as const }
            }

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || 'Ошибка регистрации')
            }

            return { status: 'ok' as const, user: await res.json() }
        },
    })
}
