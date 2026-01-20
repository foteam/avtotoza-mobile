import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
export type PromoResult =
    | {
    valid: true
    discount: number
}
    | {
    valid: false
    error?: string
}

export function useCheckPromo() {
    return useMutation<PromoResult, Error, string>({
        mutationFn: async (code: string) => {
            const res = await axios.post(API_URL+'/user/promo/check', {
                code: code,
            })

            return res.data
        },
    })
}