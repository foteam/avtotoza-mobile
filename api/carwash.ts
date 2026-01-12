import { Carwash } from '@/types/carwash'

const API_URL = 'https://114-29-236-86.cloud-xip.com/api/admin/carwash'

export async function fetchCarwashes(): Promise<Carwash[]> {
    const res = await fetch(`${API_URL}/washes`)

    if (!res.ok) {
        throw new Error('Ошибка загрузки автомоек')
    }

    // 🔥 backend возвращает МАССИВ → возвращаем МАССИВ
    const json = await res.json()

    // 🔥 ВАЖНО: достаём массив
    return json.carwashes ?? []
}
export async function fetchCarwashById(id: string) {
    const res = await fetch(`${API_URL}/get/wash/${id}`)

    if (!res.ok) {
        throw new Error('Не удалось загрузить мойку')
    }

    const json = await res.json()

    // backend возвращает { wash: {...} }
    return json.wash
}