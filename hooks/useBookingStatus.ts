import { useEffect, useRef } from 'react'
import axios from 'axios'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api'

type Params = {
    bookingId?: string
    enabled: boolean
    onPaid: () => void
    intervalMs?: number
    timeoutMs?: number
}

export function useBookingStatus({
                                     bookingId,
                                     enabled,
                                     onPaid,
                                     intervalMs = 3000,
                                     timeoutMs = 5 * 60 * 1000, // 5 минут
                                 }: Params) {
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const startedAt = useRef<number | null>(null)
    const stopped = useRef(false)

    const stop = () => {
        stopped.current = true
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    const tick = async () => {
        if (!bookingId || stopped.current) return

        // ⏱ таймаут оплаты
        if (
            startedAt.current &&
            Date.now() - startedAt.current > timeoutMs
        ) {
            stop()
            return
        }

        try {
            const res = await axios.get(
                `${API_URL}/booking/${bookingId}/status`
            )

            if (res.data.status === 'paid') {
                onPaid()
                stop()
                return
            }
        } catch (e) {
            // ошибки глотаем — как в финтехе
        }

        timerRef.current = setTimeout(tick, intervalMs) as any
    }

    useEffect(() => {
        if (!enabled || !bookingId) return

        stopped.current = false
        startedAt.current = Date.now()
        tick()

        return stop
    }, [enabled, bookingId])
}
