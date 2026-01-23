import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type User = {
    _id?: string
    user_id?: string
    phone?: string
    name?: string
    token?: string
}

type Lang = 'ru' | 'uz-Latn' | 'uz-Cyrl' | 'en'

type AuthState = {
    user: User | null

    // одноразовый id (НЕ сохраняем)
    tempUserId: number | null

    // 🌍 язык
    lang: Lang

    setUser: (user: User) => void
    setTempUserId: (id: number) => void
    clearTempUserId: () => void
    clearUser: () => void
    logout: () => void

    // 🌍 смена языка
    setLang: (lang: Lang) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            tempUserId: null,

            // дефолтный язык
            lang: 'ru',

            setUser: (user) =>
                set({
                    user,
                    tempUserId: null,
                }),

            setTempUserId: (id) =>
                set({
                    tempUserId: id,
                }),

            clearTempUserId: () =>
                set({
                    tempUserId: null,
                }),

            clearUser: () =>
                set({
                    user: null,
                }),

            logout: () =>
                set({
                    user: null,
                    tempUserId: null,
                }),

            setLang: (lang) =>
                set({
                    lang,
                }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),

            // ✅ сохраняем ТОЛЬКО нужное
            partialize: (state) => ({
                user: state.user,
                lang: state.lang,
            }),
        }
    )
)
