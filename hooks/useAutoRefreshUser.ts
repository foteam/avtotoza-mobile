import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useAuthStore } from '@/store/useAuthStore'

const INTERVAL = 10_000 // 10 секунд
const API_URL = 'https://114-29-236-86.cloud-xip.com/api/user'

export function useAutoRefreshUser() {
    const user = useAuthStore((s) => s.user)
    const setUser = useAuthStore((s) => s.setUser)
    const clearUser = useAuthStore((s) => s.clearUser)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const appStateRef = useRef<AppStateStatus>(AppState.currentState)

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const startInterval = () => {
        if (intervalRef.current || !user?.user_id) return

        const refresh = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/check/${user.user_id}`
                )

                if (res.status === 404) {
                    clearUser()
                    return
                }

                if (!res.ok) return

                const data = await res.json()

                if (data?.exists && data?.user) {
                    setUser(data.user)
                }
            } catch (e) {
                console.log('[auto-refresh-user]', e)
            }
        }

        // первый запрос сразу
        refresh()

        intervalRef.current = setInterval(refresh, INTERVAL) as any
    }

    useEffect(() => {
        // если юзера нет — стоп
        if (!user?.user_id) {
            stopInterval()
            return
        }

        // стартуем, если приложение активно
        if (appStateRef.current === 'active') {
            startInterval()
        }

        const onAppStateChange = (nextState: AppStateStatus) => {
            const prevState = appStateRef.current
            appStateRef.current = nextState

            // ушли в фон → стоп
            if (prevState === 'active' && nextState !== 'active') {
                stopInterval()
            }

            // вернулись в актив → старт
            if (prevState !== 'active' && nextState === 'active') {
                startInterval()
            }
        }

        const sub = AppState.addEventListener(
            'change',
            onAppStateChange
        )

        return () => {
            stopInterval()
            sub.remove()
        }
    }, [user?.user_id])
}
