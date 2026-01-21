import { create } from 'zustand'

export type User = {
    _id?: string
    user_id?: string
    phone?: string
    name?: string
    token?: string
}

type AuthState = {
    user: User | null

    // 👇 ВАЖНО
    tempUserId: number | null

    setUser: (user: User) => void
    setTempUserId: (id: number) => void
    clearTempUserId: () => void
    clearUser: () => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    tempUserId: null,

    setUser: (user) =>
        set({
            user,
            tempUserId: null, // очищаем временный id
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
        set ({
            user: null
        }),

    logout: () =>
        set({
            user: null,
            tempUserId: null,
        }),
}))
