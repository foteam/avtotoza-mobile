import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api'

type Payload = {
    user_id: string
    token?: string | null
}

export function useConfirmLogin() {
    const setUser = useAuthStore((s) => s.setUser)

    return useMutation({
        mutationFn: async (payload: Payload) => {
            const res = await axios.post(
                `${API_URL}/user/login`,
                payload
            )
            return res.data
        },

        onSuccess: (data) => {
            // backend должен вернуть обновлённого пользователя
            setUser(data)
        },
    })
}
